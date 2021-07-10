import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchActiveTasks, addTask } from "../api/client";

const initialState = {
    todos: [],
    status: 'idle',
    error:null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const res = await fetchActiveTasks();
    console.log('taskSlice fetchtasks: ',res[0], typeof(res));
    return res;
})

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (newTask) => {
    const res = await addTask(newTask);
    return res;
})

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchTasks.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.todos = state.todos.concat(action.payload);
        },
        [fetchTasks.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [addNewTask.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.todos.push(action.payload);
        }
    }
})

export default taskSlice.reducer;

export const selectAllTasks = (state) => state.task.todos;
