/**
 * Centralized configuration for all world measurements and settings
 */

export interface WorldConfig {
  arena: {
    size: number;           // Size of the arena (ground/roof dimensions)
    halfSize: number;       // Computed: size / 2
  };
  walls: {
    height: number;         // Height of walls
    thickness: number;      // Thickness of wall meshes
  };
  boundary: {
    margin: number;         // Distance player must stay away from walls
  };
  textures: {
    ground: string;
    walls: string;
    roof: string;
  };
  tiling: {
    ground: number;         // Texture tile size for ground
    walls: number;          // Texture tile size for walls
  };
}

/**
 * Default world configuration
 * All measurements are in world units
 */
export const worldConfig: WorldConfig = {
  arena: {
    size: 40,
    halfSize: 20, // Computed from size / 2
  },
  walls: {
    height: 20,
    thickness: 0.2,
  },
  boundary: {
    margin: 2, // Player stays 2 units away from walls
  },
  textures: {
    ground: '/floor-texture.png',
    walls: '/wall-texture.jpg',
    roof: '/roof-texture.jpg',
  },
  tiling: {
    ground: 1,
    walls: 1,
  },
};

/**
 * Helper function to compute derived values
 */
export function getWorldConfig(): WorldConfig {
  return {
    ...worldConfig,
    arena: {
      ...worldConfig.arena,
      halfSize: worldConfig.arena.size / 2,
    },
  };
}
