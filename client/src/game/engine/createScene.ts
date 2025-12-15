import { Engine, Scene, UniversalCamera, HemisphericLight, Vector3 } from 'babylonjs';
import { createGround } from '../world/ground';
import { Snowman } from '../entities/Snowman';

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
  const scene = new Scene(engine);

  // Camera
  const camera = new UniversalCamera('camera', new Vector3(0, 2, -10), scene);
  camera.speed = 0.5;  

  // Expose the Babylon scene for UI components (Reticle) to consume
  try {
    ;(window as any).babylonScene = scene;
    (window as any).camera = camera;
  } catch (e) {
    // ignore
  }

  // Light
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Ground (moved to world module)
  createGround(scene)
  const snowman = new Snowman(scene, new Vector3(0, 0, 0), camera);

  // Attach camera controls after snowman is created
  // camera.attachControl(canvas, true);    // disable built-in mouse input
  camera.inputs.removeByType("FreeCameraKeyboardMoveInput"); // Remove keyboard input

  // Configure mouse input for immediate control
  // const mouseInput = camera.inputs.attached.mouse;
  // if (mouseInput) {
  //   mouseInput.buttons = [0, 1, 2]; // Left, middle, right mouse buttons
  //   mouseInput.wheelPrecisionX = 3.0;
  //   mouseInput.wheelPrecisionY = 3.0;
  //   mouseInput.wheelPrecisionZ = 3.0;
  // }

  // Expose snowman for controller
  try {
    ;(window as any).snowman = snowman
  } catch (e) {
    // ignore
  }

  // Placeholder for player, objects, etc.

  return scene;
}
