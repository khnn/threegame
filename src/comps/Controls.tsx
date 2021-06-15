import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"


const Controls: React.FC<{props?:any}> = ({props}, ref) => {
  const { camera, gl } = useThree();
  const [controls] = useState(() => new PointerLockControls(camera, gl.domElement));
  const speed = 0.01;

  useFrame((state) => {
    // controls.moveForward(speed)
    // controls.moveRight(speed)
  })

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      if (e.repeat) {
        return
      }
      if (e.key === " ") {
        controls.isLocked ? controls.unlock() : controls.lock()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [controls])

  return controls ? <primitive dispose={undefined} object={controls} {...props} /> : null
}

export default Controls;