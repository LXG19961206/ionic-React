import React, { useState, useEffect } from 'react';

function TestComp(props:any){
  const [name,setName] = useState("TOM")
  const handleClick = () => {
    setName("TOMMY") 
  }
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
      <div>
        hello, { this.props.name }
      </div>
    )
  }
}

type typeFn = {
  name?: string,
  count?: number
}


function fn(num: number):void
function fn(num: string):string
function fn(num: any){
  if(typeof num == "string"){
    return num
  }
}


function FnComp(props: typeFn) {
  const [count, setCount] = useState( props.count || 0 )
  const [name, setName] = useState( props.name || "_" )
  return (
    <div
      onClick = {() => { setCount(() => count + 1) ; console.log(count) }} >
      { name } : { count }
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

  state: clockState = {
    num: 0
  }

  handleClick() {
    this.setState((state: clockState) => state.num = state.num + 1, () => console.log(this.state))
    this.setState((state: clockState) => state.num = state.num + 1, () => console.log(this.state))
  }

  render() {
    return (
      <div onClick = {this.handleClick.bind(this)}>
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
      <div>hello,{props.name}</div>
      <Clock />
    </div>
  )
}

const EL: React.FC = () => {
  return (
    <div>
      <FnComp />
    </div>
  )
}
export default EL
