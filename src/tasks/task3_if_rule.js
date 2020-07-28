/* eslint-disable no-unused-vars */
import React from "react"

const { useState, useEffect, useReducer } = React

// common case
function RuleCase() {
  const [value, forceUpdate] = useReducer((n) => n + 1, 0)
  const [a, setA] = useState(1)
  if (Math.floor(Math.random() * 100) > 50) {
    useEffect(() => {
      forceUpdate()
    }, [])
    return <div>render one</div>
  }

  return <div>render two</div>
}

export default RuleCase
