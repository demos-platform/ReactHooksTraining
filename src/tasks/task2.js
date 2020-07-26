import React from "react"

const { useState, useEffect, useRef } = React

function Demo() {
  const [count, setCount] = React.useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      countRef.current = countRef.current + 1
      setCount(countRef.current)
    }, 2000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return <div>Count: {count}</div>
}

export { Demo }