import { useCubeStore } from './useCubeStore';
import '@testing-library/jest-dom';
describe('Cube Store: Управление состоянием', () => {

  beforeEach(() => {
    useCubeStore.getState().reset();
  });

  test('Инициализация: создается правильное количество элементов без центра', () => {
    const cubes = useCubeStore.getState().cubes;
    expect(cubes.length).toBe(26);

    const centerPiece = cubes.find(c =>
      c.currentPosition[0] === 0 &&
      c.currentPosition[1] === 0 &&
      c.currentPosition[2] === 0
    );
    expect(centerPiece).toBeUndefined();
  });

  test('Манипуляция: поворот грани затрагивает ровно 9 элементов', () => {
    const before = useCubeStore.getState().cubes.map(c => ({
      pos: [...c.currentPosition],
      rot: c.rotation.clone()
    }));

    useCubeStore.getState().rotateSide('x', 1, 1);

    const after = useCubeStore.getState().cubes;

    const changedCount = after.filter((cube, i) => {
      const posChanged = JSON.stringify(cube.currentPosition) !== JSON.stringify(before[i].pos);
      const rotChanged = !cube.rotation.equals(before[i].rot);
      return posChanged || rotChanged;
    }).length;

    expect(changedCount).toBe(9);
  });
});
