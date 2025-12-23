import { Mesh, Scene, Vector3 } from 'babylonjs';

export class SnowmanController {
  private mesh: Mesh;
  private speed: number = 0.08;

  constructor(mesh: Mesh) {
    this.mesh = mesh;
  }

  public move(direction: Vector3) {
    // Use Babylon's collision system when moving the snowman.
    // The mesh has an ellipsoid set in Snowman.ts.
    this.mesh.moveWithCollisions(direction);
  }

  // Add more snowman-specific logic here
}
