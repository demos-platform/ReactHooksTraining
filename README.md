Hooks 新人培训演讲大纲

### React Logo 与 Hooks

![](http://with.muyunyun.cn/ddbdcec2fc39ba350fc74647f4fad6f5.jpg-300)

React 的 logo 是一个原子图案, 原子组成了物质。类似的, React 就如原子般构成了页面的表现; 而 Hooks 就如夸克, 其更接近 React 本质的样子, 但是直到 4 年后的今天才被真正设计出来。 —— Dan in React Conf(2018)

### why Hooks?

一: `多个组件间逻辑复用`: 在 Class 中使用 React 不能将带有 state 的逻辑给单独抽离成 function, 其只能通过嵌套组件的方式来解决多个组件间逻辑复用的问题, 基于嵌套组件的思想存在 [HOC](https://github.com/MuYunyun/blog/blob/master/React/从0到1实现React/8.HOC探索.md) 与 `render props` 两种设计模式。但是这两种设计模式是否存在缺陷呢?

* 嵌套地狱, 当嵌套层级过多后, 数据源的追溯会变得十分困难, 导致定位 bug 不容易; (hoc、render props)

![](http://with.muyunyun.cn/b9147e8bd39e7badccc3190fb473755f.jpg)

* 性能, 需要额外的组件实例存在额外的开销; (hoc、render props)
* 命名重复性, 在一个组件中同时使用多个 hoc, 不排除这些 hoc 里的方法存在命名冲突的问题; (hoc)

二: `单个组件中的逻辑复用`: Class 中的生命周期 `componentDidMount`、`componentDidUpdate` 甚至 `componentWillUnMount` 中的大多数逻辑基本是类似的, 必须拆散在不同生命周期中维护相同的逻辑对使用者是不友好的, 这样也造成了组件的代码量增加。

![](http://with.muyunyun.cn/0c94989b2eced65c368ff2389464fd0a.jpg-400)

![](http://with.muyunyun.cn/d21d7974dbec9a49603e2211b354496c.jpg-400)

三: Class 的其它一些问题: 在 React 使用 Class 需要书写大量样板, 用户通常会对 Class 中 Constructor 的 bind 以及 this 的使用感到困惑; 当结合 class 与 TypeScript 一起使用时, 需要对 defaultValue 做额外声明处理; 此外 React Team 表示 Class 在机器编译优化方面也不是很理想。

### React Hooks 使用中的问题

#### 闭包陷阱

* demo1: 闭包陷阱1。 [Demo 地址](https://codesandbox.io/s/22y21468r)

1. Hooks/class demo 对比演示;
2. Hooks/class 互相切换为对方的形态;

结论: 问题不在于是使用 Hooks 还是 class, 本质是受到闭包的影响。

* demo2: 闭包陷阱2

由 Class 转换过来的用户习惯 `setCount(count + 1))` 的方式。但在 Hooks 中这样子使用会产生闭包问题导致 `count` 不会增加。

```js
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
  return (
    <div>Count: {count}</div>
  )
}
```

提供 3 种解法。用户说还是想用 `setCount(count + 1)` 的形式怎么办

引出为此提供 `useInterval` 钩子, 顺利过渡到 `beast-hooks`

```js
function useInterval(callback, delay: number) {
  const cbRef = useRef({})
  useEffect(() => {
    cbRef.current = callback
  }, [callback])
  useEffect(() => {
    setInterval(() => {
      cbRef.current()
    }, delay)
  }, [delay])
}
```

用法:

```js
function Demo() {
  const [count, setCount] = React.useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 2000)

  return (<div>Count: {count}</div>)
}
```

### React Hooks 内部探究

以 `useState` 和 `useReducer` 为例

#### 使用 useState 实现 useReducer

```js
import * as React from 'react'
const { useState, useRef, useCallback } = React

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)
  const reducerRef = useRef(reducer)
  const stateRef = useRef(state)

  const dispatch = useCallback((action) => {
    setState(reducerRef.current(stateRef.current, action))
  }, [])

  useEffect(() => {
    reducerRef.current = reducer
  }, [reducer])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  return [state, dispatch]
}
```

#### 使用 useReducer 实现 useState

```js
import * as React from 'react'
const { useReducer, useCallback } = React

function useState(initialState) {
  const [state, dispatch] = useReducer((state, action) => {
    return action
  }, initialState)

  const setState = useCallback(
    (newState) => dispatch(newState), []
  )

  return [state, setState]
}
```

### 相关链接

* [React Hooks 深入系列](https://github.com/MuYunyun/blog/blob/master/React/React_Hooks深入系列.md)
* [React Hooks 设计模式](https://github.com/MuYunyun/blog/blob/master/React/React_Hooks设计模式.md)