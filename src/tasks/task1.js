import React from "react"

const { useState } = React

export function HookApp() {
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

export class ClassApp extends React.Component {
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