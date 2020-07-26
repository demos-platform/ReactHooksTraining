import React from "react"
import ReactDOM from "react-dom"
import { HookApp, ClassApp } from './tasks/task1'
import { Demo } from './tasks/task2'
import useInterval from './useInterval'
import "./styles.css"

function View() {
  return (
    <React.Fragment>
      {/* <HookApp />
      <hr />
      <ClassApp />
      <hr /> */}
      <Demo />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<View />, rootElement);
