import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder } from 'babylonjs'

export async function createEngineScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas, true)
  const scene = new Scene(engine)

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.25, 10, Vector3.Zero(), scene)
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  // simple ground & sphere for testing
  const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene)
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene)
  sphere.position.y = 1

  engine.runRenderLoop(() => {
    scene.render()
  })

  window.addEventListener('resize', () => engine.resize())
  return { engine, scene }
}
