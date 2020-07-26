import React from "react"

const { useState, useEffect } = React

function Demo() {
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1)
    }, 2000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return <div>Count: {count}</div>
}

export { Demo }