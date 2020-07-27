import React from "react"

const { useState, useEffect, useReducer } = React

// function useTimer() {
//   const [date, setDate] = useState(new Date())
//   return [date]
// }

// common case
function RuleCase() {
  const [value, forceUpdate] = useReducer((n) => n + 1, 0);
  const [a, setA] = useState(1)
  if (Math.floor(Math.random() * 100) > 50) { return <div>one</div> }
  const [b, setB] = useState(2)
  useEffect(() => {
    forceUpdate()
  }, [])
  return <div>two</div>
}

export { RuleCase };