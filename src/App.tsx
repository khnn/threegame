import React from 'react';
import Box from './comps/Box';
// import Plane from './comps/Plane';
import { OrbitControls, Plane } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const boxItems:JSX.Element[] = [];
  
  for (let i = 0; i < 100; i++) {
    boxItems.push(<Box position={[Math.random() * 20, Math.random() * 20, Math.random() * 20]} />)
  }

  return (
    <div className="App">
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxItems}        
        <Plane args={[100,100]} rotation={[- Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <meshBasicMaterial attach="material" color="hotpink" />
        </Plane>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
