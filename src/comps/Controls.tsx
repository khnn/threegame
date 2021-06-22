import React, { useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import useKeyboardControls from "../hooks/use-keyboard-controls";
import { Raycaster, Vector3, Mesh } from 'three';
import { isBox } from '../assets/helpers';
import { userSettings } from '../assets/config';


interface ControlsProps {
  setActiveBoxes: any,
  activeBoxes: number[],
}

const Controls: React.FC<ControlsProps> = (props: ControlsProps, ref) => {
  const { camera, gl, scene } = useThree();
  const { setActiveBoxes, activeBoxes } = props;
  const { speed } = userSettings;
  const [controls] = useState(() => new PointerLockControls(camera, gl.domElement));
  const [raycaster, setRaycaster] = useState<Raycaster|undefined>(undefined);
  let frontMove = 0
  let sideMove = 0
  let cameraDirection:Vector3;

  const { forward, backward, left, right } = useKeyboardControls()

  const checkIntersections = (raycaster:Raycaster|undefined) => {
    if (!raycaster) return;
    const intersectingObjects = raycaster.intersectObjects(scene.children).filter((el) => isBox(el.object as Mesh))
    intersectingObjects.forEach((o) => {
      if (!activeBoxes.includes(o.object.userData.id)) setActiveBoxes([...activeBoxes, o.object.userData.id])
    })
  }

  const updateRaycaster = useCallback(() => {
    cameraDirection = controls.getDirection(new Vector3(0, 0, 0)).clone();
    setRaycaster(() => new Raycaster(controls.getObject().position, cameraDirection));
  },[])

  useFrame((state) => {
    frontMove = Number(forward) - Number(backward)
    sideMove = Number(right) - Number(left)
    
    if (frontMove) controls.moveForward(frontMove * speed)
    if (sideMove) controls.moveRight(sideMove * speed)

    updateRaycaster()
    checkIntersections(raycaster)
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
  }, [controls, updateRaycaster])

  return controls ? <primitive dispose={undefined} object={controls} {...props} /> : null
}

export default Controls;