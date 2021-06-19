import { useState } from "react";
import { useBox } from '@react-three/cannon';

const Box: React.FC = () => {
  const [hit, setHit] = useState(false);
  const boxSize = .4;
  const margin = 5;
  const args:[number, number, number] = [boxSize, boxSize, boxSize]
  const position:[number, number, number] = [(Math.random() - 0.5) * margin, Math.random() * margin, (Math.random() - 0.5) * margin]
  const [ref] = useBox(() => ({ mass: 1, position, args }))

  return (
    <mesh
      onClick={( )=> setHit(true)}
      castShadow
      receiveShadow
      ref={ref}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={hit ? "hotpink" : "lightblue"} roughness={0.5} metalness={0.1} />
    </mesh>
  )
}

export default Box;