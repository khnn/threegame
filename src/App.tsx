import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const boxCount = 70;
  const boxSize = .4;
  const margin = 5;
  const boxItems: JSX.Element[] = [];

  for (let i = 0; i < boxCount; i++) {
    boxItems.push(
      <mesh position={[(Math.random() - 0.5) * margin, Math.random() * margin, (Math.random() - 0.5) * margin]} castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={[boxSize, boxSize, boxSize]} />
        <meshStandardMaterial attach="material" color="lightblue" roughness={0.5} metalness={0.1} />
      </mesh>)
  }

  return (
    <div className="App">
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
          position={[2* margin, 2 * margin, 3 * margin]}
          intensity={1}
        />
        {boxItems}
        <mesh rotation={[- Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeBufferGeometry attach="geometry" args={[100,100]} />
          <meshBasicMaterial attach="material" color="hotpink" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
