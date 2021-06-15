import { useEffect, useState } from "react"

const keys = {
  w: "forward",
  s: "backward",
  a: "left",
  d: "right",
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "ArrowDown": "backward",
  "ArrowUp": "forward",
}

const mapKeyToDirection = (key) => keys[key]

export default function useKeyboardControls() {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [mapKeyToDirection(e.key)]: true }))
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [mapKeyToDirection(e.key)]: false }))

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return movement
}
