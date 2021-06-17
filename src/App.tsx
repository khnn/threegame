import React, { useMemo } from 'react';
import Controls from './comps/Controls';
import Box from './comps/Box';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const boxCount = 70;
  const boxItems: JSX.Element[] = [];

  for (let i = 0; i < boxCount; i++) {
    boxItems.push(
      <Box />
    )
  }

  // const boxes = useMemo(() => boxItems, [])

  return (
    <div className="App">
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
        shadows
      >
        <ambientLight intensity={1} />
        <pointLight
          castShadow
          position={[2, 2, 3]}
          intensity={1}
        />
        {boxItems}
        <mesh rotation={[- Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshBasicMaterial attach="material" color="hotpink" />
        </mesh>
        <Controls />
      </Canvas>
      <div
        style={{
          background: 'red',
          width: '0.5rem',
          height: '0.5rem',
          position: 'absolute',
          left: '50%',
          top: '50%',
          borderRadius: '100%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </div>
  );
}

export default App;
