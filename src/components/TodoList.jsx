import React from 'react'
import { useSelector } from 'react-redux'

const TodoList = () => {
    const {item,isLoading,error} = useSelector((state)=>state.todo);
    console.log(item);
  return (
    <div className='flex flex-col justify-center items-center h-screen ' >
      <h1>todo</h1>
    </div>
  )
}

export default TodoList
