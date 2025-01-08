import { configureStore } from '@reduxjs/toolkit';

import todoSlice from "../redux/todo/todoSlice"
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
const logger = createLogger()


const store = configureStore({
    reducer: {
        todo : todoSlice
    },
    middleware : (getDefaultMiddleware )=>getDefaultMiddleware().concat(thunk,logger)
});


export default store;