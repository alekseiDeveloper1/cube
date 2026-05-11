import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type {CubeState} from "../../core/type.ts";
import {getSideColor} from "../../core/cubeLogic.ts";
import {ANIMATION_SPEED, CUBE_SIZE} from "../../core/constants.ts";

interface PieceProps {
  state: CubeState;
}

export const CubePiece: React.FC<PieceProps> = ({ state }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(
        new THREE.Vector3(...state.currentPosition),
        ANIMATION_SPEED
      );
      meshRef.current.quaternion.slerp(state.rotation, ANIMATION_SPEED);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {[...Array(6)].map((_, i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color={getSideColor(state.initialPosition, i)}
        />
      ))}
    </mesh>
  );
};
