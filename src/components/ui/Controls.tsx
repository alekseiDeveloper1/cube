import {useCubeStore} from "../../store/useCubeStore.ts";
import {NOTATION_MAP} from "../../core/constants.ts";
import {CubeSolver} from "../../core/solver.ts";
import styles from './Controls.module.css';
function Controls() {
  const rotateSide = useCubeStore((state) => state.rotateSide);
  const handleMove = (cmd: string) => {
    const move = NOTATION_MAP[cmd];
    if (move) {
      rotateSide(move.axis, move.layer, move.dir);
    }
  };
  return (
    <div className={styles.panel}>
      <div className={styles.row}>
        {['U', "U'", 'R', "R'", 'F', "F'"].map((move) => (
          <button
            key={move}
            className={styles.btnMove}
            onClick={() => {
              handleMove(move)
            }}
          >
            {move}
          </button>
        ))}
        <div className={styles.row}>
          <button
            className={styles.btnAction}
            onClick={() => CubeSolver.playAlgorithm("R U R' U' R U R' U'")}
          >
            Запустить "Пиф-Паф"
          </button>

          <button
            className={`${styles.btnAction} ${styles.btnSolve}`}
            onClick={() => CubeSolver.solveCurrentState()}
          >
            Собрать куб
          </button>
        </div>

      </div>
    </div>
  );
}

export default Controls;