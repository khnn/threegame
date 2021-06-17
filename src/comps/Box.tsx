import { useState, useMemo } from "react";

const Box: React.FC = () => {
  const [hit, setHit] = useState(false);
  const boxSize = .4;
  const margin = 5;
  const position:[number, number, number] = useMemo(() => [(Math.random() - 0.5) * margin, Math.random() * margin, (Math.random() - 0.5) * margin],[])
  
  return (
    <mesh
      position={position}
      onClick={( )=> setHit(true)}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry attach="geometry" args={[boxSize, boxSize, boxSize]} />
      <meshStandardMaterial attach="material" color={hit ? "hotpink" : "lightblue"} roughness={0.5} metalness={0.1} />
    </mesh>
  )
}

export default Box;