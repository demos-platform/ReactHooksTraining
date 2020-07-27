import React from "react"
import ReactDOM from "react-dom"
import { HookApp, ClassApp } from './tasks/task1'
import { Demo } from './tasks/task2'
import { RuleCase } from "./tasks/task3";
import useInterval from './useInterval'
import "./styles.css"

function View() {
  return (
    <>
      {/* <HookApp />
      <hr />
      <ClassApp />
      <hr /> */}
      {/* <Demo /> */}
      <RuleCase />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<View />, rootElement);
