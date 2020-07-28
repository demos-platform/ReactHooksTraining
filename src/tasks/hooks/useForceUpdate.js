import React from "react"

const { useReducer } = React

function useForceUpdate() {
  return useReducer((n) => n + 1, 0)[1]
}

export default useForceUpdate
