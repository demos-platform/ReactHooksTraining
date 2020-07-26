import React, { useState, useRef, useEffect, useReducer } from "react"
import ReactDOM from "react-dom"
import useInterval from './useInterval'
import "./styles.css"

function HookApp() {
  const [count, setCount] = useState(0)
  const handleAdd = () => {
    setCount(count + 1)
  }
  const handleAlert = () => {
    setTimeout(() => {
      window.alert(count)
    }, 2000)
  }
  return (
    <div className="App">
      <h1>Hook</h1>
      <h1>{count}</h1>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleAlert}>alert</button>
    </div>
  )
}

class ClassApp extends React.Component {
  state = {
    count: 0
  };

  handleAdd = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  handleAlert = () => {
    setTimeout(() => {
      window.alert(this.state.count);
    }, 2000);
  };

  render() {
    return (
      <div className="App">
        <h1>Class</h1>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleAdd}>add</button>
        <button onClick={this.handleAlert}>alert</button>
      </div>
    );
  }
}

/* --------------- 分割线 --------------- */

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

function View() {
  return (
    <React.Fragment>
      <HookApp />
      <hr />
      <ClassApp />
      <hr />
      {/* <Demo /> */}
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<View />, rootElement);
