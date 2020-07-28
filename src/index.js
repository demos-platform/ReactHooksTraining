/* eslint-disable no-unused-vars */
import React from "react"
import ReactDOM from "react-dom"
// eslint-disable-next-line import/named
import { HookApp, ClassApp } from "./tasks/task1"
import Demo from "./tasks/task2"
import RuleCase from "./tasks/task3_if_rule"
import useInterval from "./useInterval"
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
  )
}

// eslint-disable-next-line no-undef
const rootElement = document.getElementById("root")
ReactDOM.render(<View />, rootElement)
