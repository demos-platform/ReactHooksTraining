import React from "react"
// import { useInterval } from "../useInterval";

const { useState, useEffect, useRef, useReducer } = React

// way 1
// function Demo() {
//   const [count, setCount] = React.useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount((val) => {
//         return val + 1;
//       });
//     }, 2000);

//     return () => {
//       clearInterval(id);
//     };
//   }, []);

//   return <div>Count: {count}</div>;
// }

// way 2
// function Demo() {
//   const [count, dispatch] = useReducer(val => val + 1, 0)

//   useEffect(() => {
//     const id = setInterval(() => {
//       dispatch()
//     }, 2000);

//     return () => {
//       clearInterval(id);
//     };
//   }, []);

//   return <div>Count: {count}</div>;
// }

// way 3
// function Demo() {
//   const [count, setCount] = React.useState(0)
//   const countRef = useRef(0)

//   useEffect(() => {
//     const id = setInterval(() => {
//       countRef.current = countRef.current + 1
//       setCount(countRef.current)
//     }, 2000)

//     return () => {
//       clearInterval(id)
//     }
//   }, [])

//   return <div>Count: {count}</div>
// }

function useInterval(fn, time) {
  const fnRef = useRef(fn)
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  useEffect(() => {
    const id = setInterval(() => {
      fnRef.current();
    }, time);

    return () => {
      clearTimeout(id)
    }
  }, [])
}

// way 4
function Demo() {
  const [count, setCount] = React.useState(0);

  const id = useInterval(() => {
    setCount(count + 1)
  }, 2000)

  return <div>Count: {count}</div>;
}

export { Demo }