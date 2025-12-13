
# FPS Game Client

## Description
This is the client-side codebase for a multiplayer first-person shooter (FPS) game built with React and Babylon.js. It features a modular architecture for game logic, networking, and UI, supporting real-time multiplayer gameplay using Colyseus.

## How to Set Up
1. **Install dependencies:**
   ```sh
   yarn
   ```
2. **Start the development server:**
   ```sh
   yarn run dev
   ```
3. **Open the game:**
   Visit `http://localhost:5173` in your browser.

> **Note:** Make sure the server is running and accessible at the configured WebSocket address (default: `ws://localhost:2567`).


## Folder Structure

client/
	index.html
	node_modules/
	package.json
	public/
		vite.svg
	Readme.md
	src/
		App.tsx
		main.tsx
		style.css
		typescript.svg
		game/
			engine/              # Core game engine logic and scene setup
				createScene.ts
			entities/            # Game entities (players, NPCs, etc.)
				Snowman.ts
			projectiles/         # Projectile logic and classes
				Snowball.ts
			controllers/         # Controllers for entity behavior
				SnowmanController.ts
			world/               # World/environment objects
				Ground.ts
			utils/               # Utility/helper functions
				Random.ts
			network/             # Multiplayer/networking code
				NetworkClient.ts
		state/
			gameStore.ts
		ui/
			HUD.tsx
			PauseMenu.tsx
	tsconfig.json
	yarn.lock
