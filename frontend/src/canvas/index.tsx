import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      {/* For Reflections and backgrounds */}
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
