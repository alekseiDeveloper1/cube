import type {Axis, CubeState, Direction, Vector3Array} from "./type.ts";
import * as THREE from 'three';
import {COLORS, SIDE_INDEX} from "./constants.ts";


export const rotateCube = (
  cube: CubeState,
  axis: Axis,
  layer: number,
  dir: Direction
): CubeState => {
  const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
  if (cube.currentPosition[axisIndex] !== layer) return cube;

  const [x, y, z] = cube.currentPosition;
  let newPos: Vector3Array = [...cube.currentPosition];

  if (axis === 'x') {
    newPos = [x, -z * dir, y * dir];
  } else if (axis === 'y') {
    newPos = [z * dir, y, -x * dir];
  } else if (axis === 'z') {
    newPos = [-y * dir, x * dir, z];
  }

  const rotationAxis = new THREE.Vector3();
  rotationAxis[axis] = 1;
  const deltaRotation = new THREE.Quaternion().setFromAxisAngle(
    rotationAxis,
    (Math.PI / 2) * dir
  );
  const newRotation = deltaRotation.multiply(cube.rotation);
  const [nx, ny, nz] = newPos;

  const normalizedPos: Vector3Array = [
    nx === 0 ? 0 : nx,
    ny === 0 ? 0 : ny,
    nz === 0 ? 0 : nz
  ];

  return {
    ...cube,
    currentPosition: normalizedPos,
    rotation: newRotation
  };
};

export const generateInitialCubes = (): CubeState[] => {
  const pieces: CubeState[] = [];
  let id = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        pieces.push({
          id: id++,
          initialPosition: [x, y, z] as Vector3Array,
          currentPosition: [x, y, z] as Vector3Array,
          rotation: new THREE.Quaternion(),
        });
      }
    }
  }
  return pieces;
};

export const getSideColor = (initialPos: [number, number, number], index: number): string => {
  const [x, y, z] = initialPos;

  if (index === SIDE_INDEX.RIGHT && x === 1) return COLORS.RIGHT;
  if (index === SIDE_INDEX.LEFT && x === -1) return COLORS.LEFT;
  if (index === SIDE_INDEX.TOP && y === 1) return COLORS.UP;
  if (index === SIDE_INDEX.BOTTOM && y === -1) return COLORS.DOWN;
  if (index === SIDE_INDEX.FRONT && z === 1) return COLORS.FRONT;
  if (index === SIDE_INDEX.BACK && z === -1) return COLORS.BACK;

  return COLORS.INTERNAL;
};