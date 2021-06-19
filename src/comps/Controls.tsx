import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import useKeyboardControls from "../hooks/use-keyboard-controls";
import { Raycaster, Vector3 } from 'three';

interface ControlsProps {
}

const Controls: React.FC<ControlsProps> = (props: ControlsProps, ref) => {
  const { camera, gl, scene } = useThree();
  const [controls] = useState(() => new PointerLockControls(camera, gl.domElement));
  const [raycaster, setRaycaster] = useState<Raycaster|undefined>(undefined);
  const speed = 0.01;
  let frontMove = 0
  let sideMove = 0
  let cameraDirection:Vector3;

  const { forward, backward, left, right } = useKeyboardControls()

  const updateRaycaster = () => {
    cameraDirection = controls.getDirection(new Vector3(0, 0, 0)).clone();
    setRaycaster(() => new Raycaster(controls.getObject().position, cameraDirection));
  }

  useFrame((state) => {
    frontMove = Number(forward) - Number(backward)
    sideMove = Number(right) - Number(left)
    
    if (frontMove) controls.moveForward(frontMove * speed)
    if (sideMove) controls.moveRight(sideMove * speed)

    if (raycaster) console.log(raycaster.intersectObjects(scene.children))
    updateRaycaster()
  })

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      if (e.repeat) {
        return
      }
      if (e.key === "Enter") {
        controls.isLocked ? controls.unlock() : controls.lock()
        updateRaycaster()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [controls])

  return controls ? <primitive dispose={undefined} object={controls} {...props} /> : null
}

export default Controls;