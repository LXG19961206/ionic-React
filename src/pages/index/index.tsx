import React, { useState, useEffect, useRef } from 'react';
import { Form,FunForm } from "../ref/ref"

const axios = require('axios')
type axiosResponse = string | number | object | null | undefined 

function TestComp(props:any){
  const [name,setName] = useState("TOM")
  let list = [name]
  const handleClick = () => setName(name + "Y") 
  useEffect(()=>{
    const cb = (content:string) => console.log('旧的name是%s?',content)
    axios.get('/').then((res:axiosResponse)=> console.log(res))
    return cb.bind(null,name)
  },[name])
  
  return (
    <div>
      hello,{ name }
    </div>
  )
}


class Demo extends React.Component<msg> {
  constructor(props: any) {
    super(props)
    console.log(props)
  }

  handle = () => {
    alert(1)
  }

  render() {
    return (
      <div onClick = { this.handle.bind(this)}>
        hello, { this.props.name }
      </div>
    )
  }
}

type outer = {
  name : string
}
class Outer extends React.Component <outer> {
  constructor(props:outer){
    super(props)
  }
  handleClick(){
    console.log(this.refs.demo)
  }
  render(){
    const obj = {
      onClick: this.handleClick.bind(this)
    }
    return (
      <div {...obj}>
        <Demo ref="demo"/>
      </div>
    )
  }
}

type typeFn = {
  name?: string,
  count?: number
}


function fn(num: number): number 
function fn(num: string): void 
function fn(num: number | string){
  if(typeof num == "number"){
    return num
  }
}


function FnComp(props: typeFn) {
  const demoRef = useRef(null)
  const [count, setCount] = useState( props.count || 0 )
  const [name, setName] = useState( props.name || "_" )
  return (
    <div
      onClick = {() => { setCount(() => count + 1) ; }} >
      { name } : { count }
      <Demo ref = {demoRef}/>
    </div>
  )
}

interface clockState {
  num: number
}

class Clock extends React.Component {
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ date: new Date() })
    })
  }

  componentWillUnmount(){
    console.log("销毁")
  }

  state: clockState = {
    num: 0
  }

  handleClick() {
    this.setState((state: clockState) => state.num = state.num + 1, () => console.log(this.state))
    this.setState((state: clockState) => state.num = state.num + 1, () => console.log(this.state))
  }

  render() {
    return (
      <div onClick = { this.handleClick.bind(this) }>
        {this.state.num}
      </div>
    )
  }
}

interface msg {
  name ?: string
}

const CompOfFunc = function (props: msg) {
  return (
    <div>
      <div> hello, { props.name } </div>
      <Clock />
    </div>
  )
}

function Demo02 () {
  const [isLoad, setLoad] = useState(false)
  const [res,setRes] = useState('')
  const handleClick = () => {
    setLoad(true)
    axios.get('/').then((res:axiosResponse)=>{
      console.log(res)
      setRes(res as string + String(new Date()))
    })
  }

  useEffect(() => {
    isLoad && console.log("遮罩层")  
  },[isLoad])

  useEffect(()=>{
    setLoad(false)
    console.log("去遮罩层")
    return function(){ console.log('res发生了变化') }
  },[res])

  return (
    <div>
      <button onClick = { handleClick } >发请求</button>
    </div>
  )
}

function Demo3(){
  const [name,setName] = useState('tom')
  const [count,setCount] = useState(1)
  function init(){
    return function onClick(e:Event){
      console.log(e)
    } 
  }
  return ( <div {...init()}> { name } : { count } </div> )
}

class Life extends React.Component {
  static defaultProps =  {

  }

  constructor(props:any){
    super(props)
    console.log('1.Counter, constructor构造函数')
  }
  state = {
    number: 0
  }
  UNSAFE_componentWillMount(){
    console.log('2.Counter, 组件将要挂载')
  }

  render(){
    console.log('3.Counrer, 组件渲染')
    return (<div>
      { this.state.number }
      <button onClick = { this.handleClick.bind(this) }>click me ! </button>
      <hr/>
      {
        this.state.number < 10 && <SubLife count = {this.state.number }/>
      }
    </div>)
  }

  handleClick(){
    this.setState({number : this.state.number + 1},()=>{
      console.log(this.state.number)
    })
  }

  componentDidMount(){
    console.log('4.Counter, 组件挂载完成')
  }

  shouldComponentUpdate(nextProps:any,nextState:any){
    console.log('5.询问用户组件是否要重新渲染')
    // 这里可以写一些条件 , 只有 return true 的时候才会去更新页面
    return nextState.number % 2 == 0 
  }

  UNSAFE_componentWillUpdate(){
    console.log('6.Counter 组件将要更新')
  }

  componentDidUpdate(){
    console.log('7.Counter 组件更新完成')
  }

}
type childLife = {
  count?: number
}
class SubLife extends React.Component <childLife> {
  constructor(props:childLife){
    super(props)
    this.state.count = this.props.count
  }
  state: { count?:number } = {}
  static getDerivedStateFromProps(nextProps:childLife, lastState:any){
    console.log(nextProps.count, '进行了更新')
    return { count : nextProps.count! + 1 }
  }
  getSnapshotBeforeUpdate(prevProps:childLife, prevState:any) {
    return "我要更新了"
  }
  componentDidUpdate(props:childLife,state:any, snap:any){
    console.log('从上个钩子里获取' + snap)
  }
  render(){
    console.log("9.Counter 子组件渲染")
    return (<div>
        父组件传来的值是 {this.state.count}
    </div>)
  }
}

const EL: React.FC = () => {
  return (
    <div>
      <Life />
    </div>
  )
}
export default EL
