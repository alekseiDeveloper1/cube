import * as THREE from 'three';

export type Vector3Array = [number, number, number];

export interface CubeState {
  id: number;
  initialPosition: Vector3Array;
  currentPosition: Vector3Array;
  rotation: THREE.Quaternion;
}

export interface CubeStore {
  cubes: CubeState[];
  isAnimating: boolean;
  rotateSide: (axis: 'x' | 'y' | 'z', layer: number, dir: 1 | -1) => void;
  reset: () => void;
}

