
import React, { useEffect, useRef, useCallback } from 'react';
import { Engine, Vector3 } from 'babylonjs';
import { createScene } from './game/engine/createScene';
import { SnowmanController } from './game/controllers/SnowmanController';
import HUD from './ui/HUD';
import PauseMenu from './ui/PauseMenu';
import { useGameStore } from './state/gameStore';
import Reticle from './ui/Reticle';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const setPaused = useGameStore((s) => s.setPaused);
  const setFocused = useGameStore((s) => s.setFocused);
  const isFocused = useGameStore((s) => s.isFocused);

  // Mouse look state - moved outside useEffect to be accessible
  const mouseStateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    rotationX: 0,
    rotationY: 0,
    mouseSensitivity: 0.002
  });

  // Movement state
  const keysPressedRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  // Mouse look handler - moved outside useEffect to be reactive
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isFocused) return;
    
    const mouseState = mouseStateRef.current;
    mouseState.mouseX = e.clientX;
    mouseState.mouseY = e.clientY;
    
    // Accumulate rotation changes
    const deltaX = mouseState.mouseX - mouseState.lastMouseX;
    const deltaY = mouseState.mouseY - mouseState.lastMouseY;
    
    mouseState.rotationY += deltaX * mouseState.mouseSensitivity;
    mouseState.rotationX -= deltaY * mouseState.mouseSensitivity;
    
    // Clamp vertical rotation
    mouseState.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseState.rotationX));
    
    mouseState.lastMouseX = mouseState.mouseX;
    mouseState.lastMouseY = mouseState.mouseY;
  }, [isFocused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('Canvas ref is null');
      return;
    }
    const engine = new Engine(canvas, true);
    const scene = createScene(engine, canvas);

    // Get snowman and create controller
    const snowman = (window as any).snowman;
    const snowmanController = new SnowmanController(snowman.getMesh());
    const camera = (window as any).camera;

    engine.runRenderLoop(() => {
      // Handle continuous movement
      const moveSpeed = 0.05; // Slower for smoother movement
      let moveDirection = Vector3.Zero();

      const forward = camera.getDirection(Vector3.Forward());
      const right = camera.getDirection(Vector3.Right());

      const keysPressed = keysPressedRef.current;
      if (keysPressed.forward) {
        moveDirection.addInPlace(forward);
      }
      if (keysPressed.backward) {
        moveDirection.addInPlace(forward.scale(-1));
      }
      if (keysPressed.left) {
        moveDirection.addInPlace(right.scale(-1));
      }
      if (keysPressed.right) {
        moveDirection.addInPlace(right);
      }

      // Restrict Y movement to keep snowman grounded
      moveDirection.y = 0;

      if (moveDirection.length() > 0) {
        snowmanController.move(moveDirection.normalize().scale(moveSpeed));
      }

      // Handle mouse look
      if (isFocused) {
        const mouseState = mouseStateRef.current;
        camera.rotation.y = mouseState.rotationY;
        camera.rotation.x = mouseState.rotationX;
      }

      scene.render();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setFocused(false);
        setPaused(true);
        return;
      }
      
      // Set movement flags
      const keysPressed = keysPressedRef.current;
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          keysPressed.forward = true;
          break;
        case 's':
        case 'arrowdown':
          keysPressed.backward = true;
          break;
        case 'a':
        case 'arrowleft':
          keysPressed.left = true;
          break;
        case 'd':
        case 'arrowright':
          keysPressed.right = true;
          break;
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      // Clear movement flags
      const keysPressed = keysPressedRef.current;
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          keysPressed.forward = false;
          break;
        case 's':
        case 'arrowdown':
          keysPressed.backward = false;
          break;
        case 'a':
        case 'arrowleft':
          keysPressed.left = false;
          break;
        case 'd':
        case 'arrowright':
          keysPressed.right = false;
          break;
      }
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Focus/blur handlers for canvas
    function onCanvasFocus() {
      setFocused(true);
      // Initialize mouse position to center of screen
      const mouseState = mouseStateRef.current;
      mouseState.lastMouseX = window.innerWidth / 2;
      mouseState.lastMouseY = window.innerHeight / 2;
      mouseState.mouseX = mouseState.lastMouseX;
      mouseState.mouseY = mouseState.lastMouseY;
      // Reset rotation accumulators
      mouseState.rotationX = camera.rotation.x;
      mouseState.rotationY = camera.rotation.y;
    }

    function onCanvasBlur() {
      setFocused(false);
    }

    canvas.addEventListener('focus', onCanvasFocus);
    canvas.addEventListener('blur', onCanvasBlur);
    window.addEventListener('mousemove', onMouseMove);

    // Focus canvas on click
    function onCanvasClick() {
      if (canvas) {
        canvas.focus();
      }
    }

    canvas.addEventListener('click', onCanvasClick);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('focus', onCanvasFocus);
      canvas.removeEventListener('blur', onCanvasBlur);
      canvas.removeEventListener('click', onCanvasClick);
      engine.dispose();
    };
  }, [setPaused, setFocused]);

  // Separate effect for mouse listener to make it reactive to focus state
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove]);

  return (
	<div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#222' }}>
		<canvas ref={canvasRef} id="renderCanvas" tabIndex={0} style={{ width: '100%', height: '100%', display: 'block' }} />
		<HUD />
		<PauseMenu />
    <Reticle />
	</div>
  );
};

export default App
