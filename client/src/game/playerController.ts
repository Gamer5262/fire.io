import { Camera, Vector3 } from 'babylonjs'

export class PlayerController {
  private camera: Camera
  private speed = 0.12
  private velocity = Vector3.Zero()
  private keys: Record<string, boolean> = {}

  constructor(camera: Camera) {
    this.camera = camera
    this.initListeners()
  }

  private initListeners() {
    window.addEventListener('keydown', (e) => (this.keys[e.key.toLowerCase()] = true))
    window.addEventListener('keyup', (e) => (this.keys[e.key.toLowerCase()] = false))
  }

  public update() {
    const forward = new Vector3(0, 0, 1)
    const right = new Vector3(1, 0, 0)

    let movement = Vector3.Zero()
    if (this.keys['w']) movement = movement.add(forward)
    if (this.keys['s']) movement = movement.subtract(forward)
    if (this.keys['a']) movement = movement.subtract(right)
    if (this.keys['d']) movement = movement.add(right)

    movement = movement.normalize().scale(this.speed)
    this.camera.position.addInPlace(movement)
  }
}
