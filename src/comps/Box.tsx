import { useBox } from '@react-three/cannon';
import { config } from '../assets/config';
interface BoxProps {
  userData: {},
  active: boolean,
}

const Box: React.FC<BoxProps> = (props) => {
  const { active, userData } = props;
  const { boxSize, boxDistance } = config;
  const args:[number, number, number] = [boxSize, boxSize, boxSize]
  const position:[number, number, number] = [(Math.random() - 0.5) * boxDistance, Math.random() * boxDistance, (Math.random() - 0.5) * boxDistance]
  const [ref] = useBox(() => ({ mass: 1, position, args, userData }))

  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={active ? "hotpink" : config.boxColor} roughness={0.5} metalness={0.1} />
    </mesh>
  )
}

export default Box;