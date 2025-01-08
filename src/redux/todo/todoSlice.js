import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    item : [],
    isLoading : false,
    error : null
}
export const todoSlice = createSlice({
    name : "todo",
    initialState : initialState,
    reducers : {
        addTodo : (state,action)=>{
            state.item.push({
                id : Date.now(),
                text : action.payload,
                completed : false
            })
        },
        removeTodo : (state,action)=>{
            state.item = state.item.filter(todo=>todo.id !== action.payload)
        },
        toggleTodo : (state,action)=>{
            const todo = state.item.find(todo=>todo.id === action.payload);
            if(todo){
                todo.completed = !todo.completed
            }
        },
    }
});

export const {addTodo,removeTodo,toggleTodo} = todoSlice.actions;

export default todoSlice.reducer