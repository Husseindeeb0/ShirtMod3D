import type { ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
import * as THREE from "three";

interface CameraProps {
  children: ReactNode;
}

const CameraRig = ({ children }: CameraProps) => {
  const group = useRef<THREE.Group | null>(null);
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1200;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition: [number, number, number] = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    // Used for positioning motion
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation smoothly
    // Used for rotating motion
    easing.dampE(
      group.current!.rotation, // current
      [state.pointer.y / 2, -state.pointer.x / 3, 0], // target
      0.25, // speed
      delta // time since last frame
    ); // Each time called it moves closer to target value
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
