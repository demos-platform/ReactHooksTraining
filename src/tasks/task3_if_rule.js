/* eslint-disable no-unused-vars */
import React from "react"
import { useForceUpdate } from "./hooks"

const { useState, useEffect, useReducer } = React

// Only Call Hooks at the Top Level.
// Don’t call Hooks from regular JavaScript functions.
function RuleCase() {
  const forceUpdate = useForceUpdate()
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
