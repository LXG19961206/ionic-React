import React, { useState, useEffect, useRef , useContext } from 'react';
import { Form,FunForm } from "../ref/ref"
import { MyContext } from '../review/MyContext'
const axios = require('axios')
type posMsg = {
  x: number ,
  y: number
}
export function Position () {
  const pos:posMsg = usePosition()
  return (
    <div>
      定位:{`x:${pos.x},y:${pos.y}`}
    </div>
  )
}

function usePosition(){
  const [ pos, setPos ] = useState({x:0,y:0})
  useEffect(() =>  {
    const updatePos = (evt:any) => setPos({ x:evt.clientX, y:evt.clientY })
    document.addEventListener('mousemove', updatePos)
    return () =>  document.removeEventListener('mousemove',updatePos) 
  })
  return pos
}
function SonI(){
  const {num} = useContext(MyContext)
  return (<div>
      数量 : {num}
  </div>)
}

function SonII(){
  const {num} = useContext(MyContext)
  return (<div>
      数量 : {num}
  </div>)
}
export function Parent(){
  const [ num , setNum ] = useState(0)
  return (
    <MyContext.Provider
      value = {{ num }}>
      <button onClick = {() => { setNum(num + 1) }}> use context </button>
      <SonI/>
      <SonII/>
    </MyContext.Provider>
  )
}

export default { Position,Parent }