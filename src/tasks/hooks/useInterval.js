import React from "react"

const { useRef, useEffect } = React

export default function useInterval(callback, delay) {
  const cbRef = useRef({})
  useEffect(() => {
    cbRef.current = callback
  }, [callback])
  useEffect(() => {
    const id = setInterval(() => {
      cbRef.current()
    }, delay)

    return () => clearInterval(id)
  }, [delay])
}
