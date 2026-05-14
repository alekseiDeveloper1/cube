import * as THREE from 'three';
import { type CubeState } from './type';

const getWcaFaceLetter = (initialPos: [number, number, number], normalIdx: number): string => {
  const [x, y, z] = initialPos;
  if (normalIdx === 0 && x === 1) return 'R';
  if (normalIdx === 1 && x === -1) return 'L';
  if (normalIdx === 2 && y === 1) return 'U';
  if (normalIdx === 3 && y === -1) return 'D';
  if (normalIdx === 4 && z === 1) return 'F';
  if (normalIdx === 5 && z === -1) return 'B';
  return 'U';
};

const getScannedFaceLetter = (cube: CubeState, targetNormalIdx: number): string => {
  const globalNormals = [
    new THREE.Vector3(1, 0, 0),  // 0: Right
    new THREE.Vector3(-1, 0, 0), // 1: Left
    new THREE.Vector3(0, 1, 0),  // 2: Top
    new THREE.Vector3(0, -1, 0), // 3: Bottom
    new THREE.Vector3(0, 0, 1),  // 4: Front
    new THREE.Vector3(0, 0, -1)  // 5: Back
  ];

  const targetNormal = globalNormals[targetNormalIdx];

  for (let i = 0; i < 6; i++) {
    const localNormal = globalNormals[i].clone();
    localNormal.applyQuaternion(cube.rotation);

    if (Math.round(localNormal.dot(targetNormal)) === 1) {
      return getWcaFaceLetter(cube.initialPosition, i);
    }
  }
  return 'U';
};

export const map3DStateToWcaString = (cubes: CubeState[]): string => {
  const faces: Record<string, string[]> = { U: [], R: [], F: [], D: [], L: [], B: [] };

  for (let z = -1; z <= 1; z++) {
    for (let x = -1; x <= 1; x++) {
      const cube = cubes.find(c => Math.round(c.currentPosition[0]) === x && Math.round(c.currentPosition[1]) === 1 && Math.round(c.currentPosition[2]) === z);
      if (cube) faces.U.push(getScannedFaceLetter(cube, 2));
    }
  }

  for (let y = 1; y >= -1; y--) {
    for (let z = 1; z >= -1; z--) {
      const cube = cubes.find(c => Math.round(c.currentPosition[0]) === 1 && Math.round(c.currentPosition[1]) === y && Math.round(c.currentPosition[2]) === z);
      if (cube) faces.R.push(getScannedFaceLetter(cube, 0));
    }
  }

  for (let y = 1; y >= -1; y--) {
    for (let x = -1; x <= 1; x++) {
      const cube = cubes.find(c => Math.round(c.currentPosition[0]) === x && Math.round(c.currentPosition[1]) === y && Math.round(c.currentPosition[2]) === 1);
      if (cube) faces.F.push(getScannedFaceLetter(cube, 4));
    }
  }

  for (let z = 1; z >= -1; z--) {
    for (let x = -1; x <= 1; x++) {
      const cube = cubes.find(c => Math.round(c.currentPosition[0]) === x && Math.round(c.currentPosition[1]) === -1 && Math.round(c.currentPosition[2]) === z);
      if (cube) faces.D.push(getScannedFaceLetter(cube, 3));
    }
  }

  for (let y = 1; y >= -1; y--) {
    for (let z = -1; z <= 1; z++) {
      const cube = cubes.find(c => Math.round(c.currentPosition[0]) === -1 && Math.round(c.currentPosition[1]) === y && Math.round(c.currentPosition[2]) === z);
      if (cube) faces.L.push(getScannedFaceLetter(cube, 1));
    }
  }

  for (let y = 1; y >= -1; y--) {
    for (let x = 1; x >= -1; x--) {
      const cube = cubes.find(c => Math.round(c.currentPosition[0]) === x && Math.round(c.currentPosition[1]) === y && Math.round(c.currentPosition[2]) === -1);
      if (cube) faces.B.push(getScannedFaceLetter(cube, 5));
    }
  }

  return [...faces.U, ...faces.R, ...faces.F, ...faces.D, ...faces.L, ...faces.B].join('');
};
