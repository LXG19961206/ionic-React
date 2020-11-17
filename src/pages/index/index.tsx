import Home from "../home/Home"
import React, { useRef } from 'react';

console.log(Home)
const EL:React.FC = () => {
  const childRef = useRef()
  const data = {
    desc: "我是描述",
    title: "我是标题",
    content: "document.querySelectorAll是dom元素中最为好用简洁的api"
  }
  return (<div>
    <Home msg={data}></Home>
  </div>)
}
export default EL