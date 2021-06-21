import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import useKeyboardControls from "../hooks/use-keyboard-controls";
import { Raycaster, Vector3, Mesh } from 'three';
import { isBox } from '../assets/helpers';
import { config } from '../assets/config';

interface ControlsProps {
}

const Controls: React.FC<ControlsProps> = (props: ControlsProps, ref) => {
  const { camera, gl, scene } = useThree();
  const [controls] = useState(() => new PointerLockControls(camera, gl.domElement));
  const [raycaster, setRaycaster] = useState<Raycaster|undefined>(undefined);
  const boxes = scene.children.filter((el) => isBox(el as THREE.Mesh))
  const speed = 0.01;
  let frontMove = 0
  let sideMove = 0
  let cameraDirection:Vector3;

  const { forward, backward, left, right } = useKeyboardControls()

  const checkIntersections = (raycaster:Raycaster|undefined) => {
    if (!raycaster) return;
    const intersectingObjects = raycaster.intersectObjects(scene.children).filter((el) => isBox(el.object as Mesh))
    intersectingObjects.forEach((o) => {
      const object = scene.getObjectById(o.object.id) as Mesh
      //@ts-ignore
      object.material.color.set('#0000ff')
    })
  }

  const updateRaycaster = () => {
    cameraDirection = controls.getDirection(new Vector3(0, 0, 0)).clone();
    setRaycaster(() => new Raycaster(controls.getObject().position, cameraDirection));
  }

  useFrame((state) => {
    frontMove = Number(forward) - Number(backward)
    sideMove = Number(right) - Number(left)
    
    if (frontMove) controls.moveForward(frontMove * speed)
    if (sideMove) controls.moveRight(sideMove * speed)

    updateRaycaster()
    checkIntersections(raycaster)
  })

  useEffect(() => {
    //@ts-ignore
    boxes.forEach((b) => b.material.color.set(config.boxColor));

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
  }, [controls, boxes])

  return controls ? <primitive dispose={undefined} object={controls} {...props} /> : null
}

export default Controls;