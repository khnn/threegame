import React from 'react';
// import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
// import useEffectfulState from "../use-effectful-state"


const Controls: React.FC = () => {
  const { camera, gl } = useThree();
  const controls: PointerLockControls = new PointerLockControls(camera, gl.domElement)

  useFrame((state) => {
    // controls.moveForward(1)
    // controls.moveRight(1)
  })

  return controls ? <primitive dispose={undefined} object={controls} /> : null
}

export default Controls;