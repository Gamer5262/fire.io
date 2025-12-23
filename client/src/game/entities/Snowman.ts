import { Scene, MeshBuilder, Vector3, Mesh, Camera } from 'babylonjs';

export class Snowman {
  private scene: Scene;
  private rootMesh: Mesh;

  constructor(scene: Scene, position: Vector3 = Vector3.Zero(), camera?: Camera) {
    this.scene = scene;
    this.rootMesh = new Mesh('snowman', scene);
    this.rootMesh.position = position;

    // Enable collisions for the snowman and define a collision shape matching the bigger size
    this.rootMesh.checkCollisions = true;
    (this.rootMesh as any).ellipsoid = new Vector3(1, 2, 1); // Bigger collision shape
    (this.rootMesh as any).ellipsoidOffset = new Vector3(0, 2, 0); // Offset to center on snowman

    this.createSnowman();
    if (camera) {
      this.attachCamera(camera);
    }
  }

  private createSnowman() {
    // Bottom sphere (largest) - made bigger
    const bottom = MeshBuilder.CreateSphere('bottom', { diameter: 2 }, this.scene);
    bottom.position.y = 1; // Bottom of sphere at y=0
    bottom.parent = this.rootMesh;

    // Middle sphere - made bigger
    const middle = MeshBuilder.CreateSphere('middle', { diameter: 1.2 }, this.scene);
    middle.position.y = 2.6; // Positioned above bottom sphere
    middle.parent = this.rootMesh;

    // Head sphere - added for completeness
    const head = MeshBuilder.CreateSphere('head', { diameter: 0.8 }, this.scene);
    head.position.y = 3.8; // Positioned above middle sphere
    head.parent = this.rootMesh;
  }

  private attachCamera(camera: Camera) {
    camera.parent = this.rootMesh;
    // Position camera higher up (at head/eye level) so you can look down and see feet
    camera.position = new Vector3(0, 4, 0.3); // Higher up, slightly forward
    // Remove fixed target so camera can rotate freely (handled by App.tsx mouse look)
  }

  public getMesh(): Mesh {
    return this.rootMesh;
  }
}
