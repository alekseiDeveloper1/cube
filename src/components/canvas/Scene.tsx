import {Environment, OrbitControls} from '@react-three/drei';
import {Canvas} from "@react-three/fiber";
import Controls from "../ui/Controls.tsx";
import {RubiksCube} from "./RubiksCube.tsx";
import {CAMERA_DEFAULT_POSITION} from "../../core/constants.ts";

function Scene() {

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas data-testid='canvas-test-id' camera={CAMERA_DEFAULT_POSITION}>
        <Environment preset="apartment" background={false} blur={0.7} />

        <ambientLight intensity={0.4} />

        <pointLight
          position={[4, 5, 4]}
          intensity={0.8}
          decay={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <pointLight
          position={[0, 5, -5]}
          intensity={0.8}
          decay={1.2}
        />
        <RubiksCube />
        <OrbitControls makeDefault />
      </Canvas>
      <Controls />
    </div>

  );
}

export default Scene;