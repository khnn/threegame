import React, { useState, useMemo } from 'react';
import Camera from './comps/Camera';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const boxCount = 70;
  const boxSize = .4;
  const margin = 5;
  const speed = .3;
  const boxItems: JSX.Element[] = [];
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 8])

  const handleMovement = (direction:string) => {
    if (direction === 'x') setCameraPosition(
      [
        cameraPosition[0],
        cameraPosition[1],
        cameraPosition[2] - speed
      ]
    )

    if (direction === '-x') setCameraPosition(
      [
        cameraPosition[0],
        cameraPosition[1],
        cameraPosition[2] + speed
      ]
    )

    if (direction === '-y') setCameraPosition(
      [
        cameraPosition[0] - speed,
        cameraPosition[1],
        cameraPosition[2]
      ]
    )

    if (direction === 'y') setCameraPosition(
      [
        cameraPosition[0] + speed,
        cameraPosition[1],
        cameraPosition[2]
      ]
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "w") handleMovement('x');
    if (event.key === "a") handleMovement('-y');
    if (event.key === "s") handleMovement('-x');
    if (event.key === "d") handleMovement('y');

    return;
  }

  for (let i = 0; i < boxCount; i++) {
    boxItems.push(
      <mesh position={[(Math.random() - 0.5) * margin, Math.random() * margin, (Math.random() - 0.5) * margin]} castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={[boxSize, boxSize, boxSize]} />
        <meshStandardMaterial attach="material" color="lightblue" roughness={0.5} metalness={0.1} />
      </mesh>)
  }

  const boxes = useMemo(() => boxItems, [])

  return (
    <div
      className="App"
      onKeyPress={(e: React.KeyboardEvent) => handleKeyDown(e)}
      tabIndex={0}
    >
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
        }}
        shadows
      >
        <ambientLight intensity={1} />
        <pointLight
          castShadow
          position={[2 * margin, 2 * margin, 3 * margin]}
          intensity={1}
        />
        {boxes}
        <mesh rotation={[- Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshBasicMaterial attach="material" color="hotpink" />
        </mesh>
        <Camera cameraPosition={cameraPosition} />
      </Canvas>
    </div>
  );
}

export default App;
