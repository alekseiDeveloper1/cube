import {Center} from '@react-three/drei';
import {CubePiece} from "./CubePiece.tsx";
import {useCubeStore} from "../../store/useCubeStore.ts";

export const RubiksCube = () => {
  const cubes = useCubeStore((state) => state.cubes);
  return (
    <Center>
      {cubes.map((cube) => (
        <CubePiece key={cube.id} state={cube} />
      ))}
    </Center>
  );
};
