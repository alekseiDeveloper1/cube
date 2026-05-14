import { useCubeStore } from '../store/useCubeStore';
import { NOTATION_MAP } from './constants';
import { map3DStateToWcaString } from './cubeMapper';
import Cube from 'cubejs';

Cube.initSolver();

export const CubeSolver = {
  async playAlgorithm(algoString: string, delay = 350) {
    if (!algoString.trim()) return;

    const moves = algoString.trim().split(/\s+/).filter(Boolean);
    const { rotateSide } = useCubeStore.getState();

    for (const m of moves) {
      if (m.endsWith('2')) {
        const baseMove = m.slice(0, -1);
        const move = NOTATION_MAP[baseMove];
        if (move) {
          rotateSide(move.axis, move.layer, move.dir);
          await new Promise(r => setTimeout(r, delay));
          rotateSide(move.axis, move.layer, move.dir);
          await new Promise(r => setTimeout(r, delay));
        }
        continue;
      }

      const move = NOTATION_MAP[m];
      if (move) {
        rotateSide(move.axis, move.layer, move.dir);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  },

  async solveCurrentState(): Promise<void> {
    console.log('Сканирование 3D куба...');
    const cubes = useCubeStore.getState().cubes;

    try {
      const cubeString = map3DStateToWcaString(cubes);
      console.log('Текущая WCA строка:', cubeString);

      const virtualCube = Cube.fromString(cubeString);

      console.log('Поиск оптимальных ходов...');
      const solution: string = virtualCube.solve();

      if (solution) {
        console.log(`Решение найдено: ${solution}`);
        await this.playAlgorithm(solution);
      } else {
        console.log('Кубик уже собран!');
      }
    } catch (error) {
      console.error('Критическая ошибка математики: куб в невозможной конфигурации.', error);
    }
  }
};
