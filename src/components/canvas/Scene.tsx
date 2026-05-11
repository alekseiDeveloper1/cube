import {OrbitControls} from '@react-three/drei';
import {Canvas} from "@react-three/fiber";
import Controls from "../ui/Controls.tsx";
import {RubiksCube} from "./RubiksCube.tsx";
import {CAMERA_DEFAULT_POSITION, LIGHT_POS} from "../../core/constants.ts";

function Scene() {

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas data-testid='canvas-test-id' camera={CAMERA_DEFAULT_POSITION}>
        <ambientLight intensity={0.5} />
        <pointLight position={LIGHT_POS} />
        <RubiksCube />
        <OrbitControls makeDefault />
      </Canvas>
      <Controls />
    </div>

  );
}

export default Scene;