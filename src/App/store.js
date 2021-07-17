import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../components/taskSlice';
import commentReducer from '../components/comments/commentSlice';

export default configureStore({
    reducer:{
        task: taskReducer,
        comment: commentReducer
    }
})