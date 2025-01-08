import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    item: [{
        id: 1,
        text: 'Learn React',
        completed: false
    }],
    isLoading: false,
    error: null
}
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const response = res.json();
    return response;
})
export const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            state.item.push({
                id: Date.now(),
                text: action.payload,
                completed: false
            })
        },
        removeTodo: (state, action) => {
            state.item = state.item.filter(todo => todo.id !== action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.item.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        extraReducers : (builder )=>{
            builder
            .addCase(fetchTodos.pending,(state,action)=>{
                state.isLoading = true,
                state.error = null
            } )
            .addCase(fetchTodos.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.isLoading = action.payload
            })
            .addCase(fetchTodos.rejected,(state,action)=>{
                state.isLoading = false,
                state.error = action.error.message
            })
        }
    }
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer