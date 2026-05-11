export const CUBE_SIZE = 0.95;
export const ROUNDNESS = 0.1;

export const COLORS = {
  UP: '#ffffff',
  DOWN: '#ffff00',
  FRONT: '#009b48',
  BACK: '#0046ad',
  RIGHT: '#b71234',
  LEFT: '#ff5800',
  INTERNAL: '#111111'
};

export const SIDE_INDEX = {
  RIGHT: 0,
  LEFT: 1,
  TOP: 2,
  BOTTOM: 3,
  FRONT: 4,
  BACK: 5,
};

export const ANIMATION_SPEED = 0.25;
export const SPRING_CONFIG = {
  stiffness: 300,
  damping: 30
};

export const CAMERA_DEFAULT_POSITION: {
  position: [number, number, number]
  fov: number
} = { position: [5, 5, 5], fov: 45 }

export const LIGHT_POS:[number, number, number] = [10, 10, 10]
export const NOTATION_MAP: Record<string, { axis: 'x' | 'y' | 'z', layer: number, dir: 1 | -1 }> = {
  'U':  { axis: 'y', layer:  1, dir: -1 },
  "U'": { axis: 'y', layer:  1, dir:  1 },
  'D':  { axis: 'y', layer: -1, dir:  1 },
  "D'": { axis: 'y', layer: -1, dir: -1 },
  'R':  { axis: 'x', layer:  1, dir: -1 },
  "R'": { axis: 'x', layer:  1, dir:  1 },
  'L':  { axis: 'x', layer: -1, dir:  1 },
  "L'": { axis: 'x', layer: -1, dir: -1 },
  'F':  { axis: 'z', layer:  1, dir: -1 },
  "F'": { axis: 'z', layer:  1, dir:  1 },
  'B':  { axis: 'z', layer: -1, dir:  1 },
  "B'": { axis: 'z', layer: -1, dir: -1 },
};
