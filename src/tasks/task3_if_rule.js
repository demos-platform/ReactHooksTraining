/* eslint-disable no-unused-vars */
import React from "react"
import { useForceUpdate } from "./hooks"

const { useState, useEffect, useReducer } = React

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
