import React, { useState, useEffect, useRef } from 'react';

type refType = {
  current ?: {
    getFocus?: () => void
  } | null 
} 
export class Form extends React.Component {
  constructor(props:any){
    super(props)
    this.textInput = React.createRef()
  }

  textInput: refType

  getFocus(){
    // 指向我们  textInput 类组件的实例
    this.textInput.current!.getFocus && (this.textInput.current!.getFocus = () => alert(1))
    this.textInput.current!.getFocus!()
  }

  render(){
    return (
    <div>
      <TextInput ref = { this.textInput as any } />
      <button onClick = { this.getFocus.bind(this) }>获取焦点</button>
    </div>
    )
  }
}
interface inputRef  {
  current : {
    focus ?: ()=>{} | null,
    value : string
  } | null
}
class TextInput extends React.Component {
  constructor(props:any){
    super(props)
    this.input = React.createRef()
  }
  input: inputRef

  getFocus = () => {
    this.input.current!.focus!()
    this.input.current!.value && (this.input.current!.value = "哈哈哈")
  }

  render(){
    return (<input ref = { this.input as any }/>)
  }
}
// use forwardRef
const MyInput = React.forwardRef((props,ref)=>{
  return (<input  ref = { ref as any } />)
})

export function FunForm(props:any){
  let ref:any  
  return (
  <div>
    <MyInput
      ref = {ref as any}/>
    <button onClick = { () => console.log(ref) }> click </button>
  </div>
  )
}

function forwardRef(fn:(props:any)=>{}){
  return class Xxx extends React.Component {
    render(){
      return fn(this.props)
    }
  }
}

// 不推荐你在函数组件上直接使用 useRef
// 在函数组件上,如果想要使用 ref , 请使用 forwardRef(转发ref)
// ref转发是一项将 ref 自动的通过组件传递到子组件的方法
// ref允许函数组件接收ref,并向下传递

export default { Form,FunForm }