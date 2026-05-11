import {useCubeStore} from "../../store/useCubeStore.ts";
import {NOTATION_MAP} from "../../core/constants.ts";

function Controls() {
  const rotateSide = useCubeStore((state) => state.rotateSide);
  const handleMove = (cmd: string) => {
    const move = NOTATION_MAP[cmd];
    if (move) {
      rotateSide(move.axis, move.layer, move.dir);
    }
  };
  return (
    <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', gap: 10 }}>
      <button onClick={() => handleMove("U'")}>U (Верх)</button>
      <button onClick={() => handleMove("R'")}>R (Право)</button>
      <button onClick={() => handleMove("F'")}>F (Перед)</button>
      <button onClick={() => handleMove('D')}>U (Низ)</button>
      <button onClick={() => handleMove('L')}>R (Лево)</button>
      <button onClick={() => handleMove('B')}>F (Назад)</button>
    </div>
  );
}

export default Controls;