import React, { useMemo } from 'react';
import Controls from './comps/Controls';
import Box from './comps/Box';
import Plane from './comps/Plane';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import './App.css';

function App() {
  const boxCount = 20;
  const boxItems: JSX.Element[] = [];

  for (let i = 0; i < boxCount; i++) {
    boxItems.push(
      <Box />
    )
  }

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
        <Physics
          gravity={[0, -4, 0]}
        >
          <ambientLight intensity={1} />
          <pointLight
            castShadow
            position={[2, 2, 3]}
            intensity={1}
          />
          {boxItems}
          <Plane />
          <Controls />
        </Physics>
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
