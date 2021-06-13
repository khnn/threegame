import React, { useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useSpring, a } from "@react-spring/three";

const Camera:React.FC<{cameraPosition:[number, number, number]}> = ({cameraPosition}) => {

  const animated = useSpring({
    to: { position: cameraPosition },
  });

  return (
    <a.mesh {...animated}>
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
      />
    </a.mesh>
  )
}

export default Camera;