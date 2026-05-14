import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type {CubeState} from "../../core/type.ts";
import {getSideColor} from "../../core/cubeLogic.ts";
import {ANIMATION_SPEED, CUBE_SIZE} from "../../core/constants.ts";
import {useTexture} from "@react-three/drei";

interface PieceProps {
  state: CubeState;
}

export const CubePiece: React.FC<PieceProps> = ({ state }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [colorMap, normalMap, roughnessMap, metallicMap] = useTexture([
    './textures/Poliigon_TilesCeramicWhite_6956_BaseColor.jpg',
    './textures/Poliigon_TilesCeramicWhite_6956_Normal.png',
    './textures/Poliigon_TilesCeramicWhite_6956_Roughness.jpg',
    './textures/Poliigon_TilesCeramicWhite_6956_Metallic.jpg',
  ]);
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
        <meshPhysicalMaterial
          key={i}
          attach={`material-${i}`}
          color={getSideColor(state.initialPosition, i)}
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalnessMap={metallicMap}
          displacementScale={0.012}
          roughness={0.35}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          ior={1.5}
          reflectivity={0.6}
          normalScale={new THREE.Vector2(1.0, 1.0)}
        />
      ))}
    </mesh>
  );
};
