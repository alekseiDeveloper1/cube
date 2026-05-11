import * as THREE from 'three';
import '@testing-library/jest-dom';
import {rotateCube} from "./cubeLogic.ts";
import type {CubeState, Vector3Array} from "./type.ts";

describe('Cube Logic: Математика вращений', () => {
  const createMockPiece = (pos: Vector3Array): CubeState => ({
    id: 1,
    initialPosition: pos,
    currentPosition: pos,
    rotation: new THREE.Quaternion(),
  });

  test('Движение U: кубик с Front должен переместиться на Right', () => {
    const piece = createMockPiece([0, 1, 1]);

    const rotated = rotateCube(piece, 'y', 1, 1);

    expect(rotated.currentPosition).toEqual([1, 1, 0]);
  });

  test('Изоляция: поворот слоя Y не должен влиять на кубики в слое Y=-1', () => {
    const piece = createMockPiece([0, -1, 1]);
    const rotated = rotateCube(piece, 'y', 1, 1);

    expect(rotated.currentPosition).toEqual([0, -1, 1]);
    expect(rotated).toBe(piece);
  });
});
