
function Box(props: any) {
  return (
    <mesh
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default Box