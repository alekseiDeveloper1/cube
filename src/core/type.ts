import * as THREE from 'three';

export type Vector3Array = [number, number, number];

export type Axis = 'x' | 'y' | 'z';
export type Direction = 1 | -1;

export interface CubeState {
  id: number;
  initialPosition: Vector3Array;
  currentPosition: Vector3Array;
  rotation: THREE.Quaternion;
}

export interface CubeStore {
  cubes: CubeState[];
  isAnimating: boolean;
  rotateSide: (axis: Axis, layer: number, dir: Direction) => void;
  reset: () => void;
}
