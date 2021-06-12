
function Plane(props: any) {
  return (
    <mesh
      {...props}
    >
      <planeGeometry args={[10, 10, 10]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default Plane