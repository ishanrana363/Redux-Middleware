import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, removeTodo, toggleTodo } from "../redux/todo/todoSlice";


const TodoList = () => {
    const [data, setData] = useState('')
    const { item, isLoading, error } = useSelector((state) => state.todo);
    console.log(item)
    const dispatch = useDispatch()
    const addTodoData = () => {
        if (data.trim() !== '') {
            dispatch(addTodo(data))
            setData('')
        }
    };

    const removeTodoData = (id) => {
        dispatch(removeTodo(id))
    };

    const toggleTodoData = (id) => {
        dispatch(toggleTodo(id))
    }

    useEffect(()=>{
        dispatch(fetchTodos())
    },[dispatch])

    console.log(item)

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen " >
                <h1>Loading data.</h1>
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen " >
                <h1>Data fetching error.</h1>
            </div>
        )
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center  space-y-4">
            <h2 className="text-xl font-bold">Todo List App</h2>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={data}
                    placeholder="Add a todo"
                    onChange={(e) => { setData(e.target.value) }}
                    className="px-4 py-2 border border-gray-300 rounded text-black placeholder:text-black"
                />

                <button onClick={addTodoData} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Add
                </button>
            </div>

            <div>
                <ul className="w-full max-w-md">
                    {
                        item.length > 0 ? item.map((todo) => {
                            return (
                                <li key={todo.id} className="border-b border-gray-200 px-4 py-2 text-gray-600">
                                    <span onClick={() => { toggleTodoData(todo.id) }} className={`${todo.completed ? 'line-through text-gray-500' : ''} cursor-pointer `}>{todo.text || todo.title }</span>
                                    <button onClick={() => removeTodoData(todo.id)} className="ml-2 text-sm text-red-500 hover:text-red-600" >
                                        Delete
                                    </button>
                                </li>
                            )
                        })

                            : <>
                                <h1>data not found</h1>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default TodoList;