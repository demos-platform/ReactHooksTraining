Hooks 新人培训演讲大纲

### Hooks

![](http://with.muyunyun.cn/ddbdcec2fc39ba350fc74647f4fad6f5.jpg-300)

React 的 logo 是一个原子图案, 原子组成了物质。类似的, React 就如原子般构成了页面的表现; 而 Hooks 就如夸克, 其更接近 React 本质的样子, 但是直到 2019 年才被真正设计出来(花了近 4 年时间)。 —— Dan in React Conf(2018)

### React 中的逻辑复用

在 Hooks 出来之前, 类组件是如何进行逻辑复用的呢？

熟悉 React 的同学可能知道在 React 的设计理念中, 社区推崇使用组合而非继承的方式来达到逻辑复用的目的。[HOC](https://github.com/MuYunyun/blog/blob/master/React/从0到1实现React/8.HOC探索.md) 与 [Render Props](https://github.com/MuYunyun/blog/blob/master/React/从0到1实现React/16.RenderProps.md) 是当下类组件中复用逻辑常用的手段。

HOC:

```js
// react-redux
class MyComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

Render Props:

```js
// Beast 组件 Matrix
<Matrix dataSources={dataSources}>
  {({ src, index }) => {
    return (
      <>
        <div>name: {src.name}</div>
        <div>index: {index}</div>
      </>
    )
  }}
</Matrix>
```

这两种模式是否存在缺陷呢?

* 开发层面
  * 排查问题不易。当嵌套层级过多后, 数据源的追溯会变得十分困难, 导致排查定位问题不易; (Hoc、Render props)
    * ![](http://with.muyunyun.cn/b9147e8bd39e7badccc3190fb473755f.jpg)
  * 业务逻辑分散。基于`生命周期编程`, 代码量增加。
    * 类组件生命周期 `componentDidMount`、`componentDidUpdate`、`componentWillUnMount` 中大多数逻辑是类似的, 拆散在不同生命周期中维护相同的逻辑对使用者是不友好, 同时也造成了组件的代码量增加。
      * 基于类: ![](http://with.muyunyun.cn/0c94989b2eced65c368ff2389464fd0a.jpg-400)
      * 基于 Hooks: ![](http://with.muyunyun.cn/d21d7974dbec9a49603e2211b354496c.jpg-400)
  * 属性覆盖。若同时使用多个 Hoc, 容易存在命名冲突导致属性被覆盖的情况; (Hoc)
* 性能开销大。组件实例化存在额外的开销; (Hoc、Render props)

此外类组件还有一些其它问题:

* 冗余的样板代码。比如 `this.xxxFn = this.xxxFn.bind(this)`
* 学习成本相对高。比如要掌握各个生命周期
* 编译优化方面不理想。编译时间长, 编译出的代码体积大。另外可以见 [Vue: Update: the Class API proposal is being dropped.](https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121) 这个 issue.

* React Hooks 的常见陷阱
  * 闭包陷阱, (useInterval, useFetch)

### React Hooks 使用中的问题

#### 百思不解, 必是闭包

* Part1: 闭包陷阱

> [Demo 地址](https://codesandbox.io/s/22y21468r)

1. 函数组件/类组件 Demo 对比演示;
2. 函数组件/类组件互相切换为对方的形态;

结论: 问题不在于是使用函数组件还是类组件, 本质是受到闭包的影响。

* Part2: 闭包陷阱2

之前写过类组件的用户应该习惯 `setCount(count + 1))` 的方式。但在函数组件中这样子使用会产生闭包问题导致 `count` 不会增加。

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

提供若干种解法。用户说还是想用 `setCount(count + 1)` 的形式怎么办

引出自定义 hooks 的概念。介绍 `useInterval` 钩子, 顺利过渡到 `beast-hooks`

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

### 相关链接

* [React Hooks 深入系列](https://github.com/MuYunyun/blog/blob/master/React/React_Hooks深入系列.md)
* [React Hooks 设计模式](https://github.com/MuYunyun/blog/blob/master/React/React_Hooks设计模式.md)