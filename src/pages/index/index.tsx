import React, { useState, useEffect, useRef } from 'react';

const axios = require('axios')
type axiosResponse = string | number | object | null | undefined 

function TestComp(props:any){
  const [name,setName] = useState("TOM")
  let list = [name]
  const handleClick = () => {
    setName(name + "Y") 
  }
  useEffect(()=>{
    const cb = (content:string) => console.log('旧的name是%?',content)
    axios.get('/').then((res:axiosResponse)=> console.log(res))
    return cb.bind(null,name)
  },[])
  return (
    <div onClick = {handleClick}>
      hello,{ name }
    </div>)
}


class Demo extends React.Component<msg> {
  constructor(props: any) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <div onClick = { ()=> axios.get('/').then((res: axiosResponse) => console.log(res)) }>
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
  }
  render(){
    return (
      <div>
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
      <Demo 
        ref = {demoRef}/>
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
  useEffect(()=>{
    isLoad && console.log("遮罩层")  
  },[isLoad])

  useEffect(()=>{
    setLoad(false)
    console.log("去遮罩层")
    return function(){ console.log('res发生了变化') }
  },[res])

  return (
    <div>
      <button onClick = { handleClick }>发请求</button>
    </div>
  )
}

const EL: React.FC = () => {
  return (
    <div>
      <Demo02 />
    </div>
  )
}
export default EL
