import React from 'react';
import Controls from './comps/Controls';
import Box from './comps/Box';
import Plane from './comps/Plane';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import './App.css';
import { config } from './assets/config';
import { useState } from 'react';

function App() {
  const { boxCount, boxActiveItems } = config;
  const [activeBoxes, setActiveBoxes] = useState<number[]>(boxActiveItems)
  const boxItems:{id: number, active: boolean}[] = [];
  
  for (let i = 0; i < boxCount; i++) {
    boxItems.push(
      {
        id: i,
        active: activeBoxes.includes(i)
      }
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
          {boxItems.map((b) => <Box active={b.active} userData={{ id: b.id }} key={b.id} />)}
          <Plane />
          <Controls activeBoxes={activeBoxes} setActiveBoxes={setActiveBoxes} />
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
