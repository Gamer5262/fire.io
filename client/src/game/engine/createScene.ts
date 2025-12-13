import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder } from 'babylonjs';

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
  const scene = new Scene(engine);

  // Camera
  const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  // Light
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Ground
  MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

  // Placeholder for player, objects, etc.

  return scene;
}
