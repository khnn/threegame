import {usePlane} from '@react-three/cannon';

function Plane(props: any) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0] }))

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

export default Plane