import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import useKeyboardControls from "../hooks/use-keyboard-controls";

const Controls: React.FC<{props?:any}> = ({props}, ref) => {
  const { camera, gl } = useThree();
  const [controls] = useState(() => new PointerLockControls(camera, gl.domElement));
  const speed = 0.01;
  let frontMove = 0
  let sideMove = 0

  const { forward, backward, left, right } = useKeyboardControls()
  
  useFrame((state) => {
    frontMove = Number(forward) - Number(backward)
    sideMove = Number(right) - Number(left)

    if (frontMove) controls.moveForward(frontMove * speed)
    if (sideMove) controls.moveRight(sideMove * speed)
  })

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      if (e.repeat) {
        return
      }
      if (e.key === "Enter") {
        controls.isLocked ? controls.unlock() : controls.lock()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [controls])

  return controls ? <primitive dispose={undefined} object={controls} {...props} /> : null
}

export default Controls;