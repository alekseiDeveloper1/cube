import {create} from "zustand/react";
import {type CubeStore} from "../core/type.ts";
import {generateInitialCubes, rotateCube} from "../core/cubeLogic.ts";

export const useCubeStore = create<CubeStore>((set) => ({
  cubes: generateInitialCubes(),
  isAnimating: false,

  rotateSide: (axis, layer, dir) => {
    set((state) => ({
      cubes: state.cubes.map(cube => rotateCube(cube, axis, layer, dir))
    }));
  },

  reset: () => set({ cubes: generateInitialCubes() }),
}));
