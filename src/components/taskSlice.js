import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchActiveTasks, addTask, updateTask, closeTask, deleteTask } from "../api/client";

const initialState = {
    todos: [],
    status: 'idle',
    error:null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const res = await fetchActiveTasks();
    return res;
})

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (newTask) => {
    const res = await addTask(newTask);
    return res;
})

export const updateTasks = createAsyncThunk('tasks/updateTasks', async (updates) => {
    await updateTask(updates);
    return updates;
})

export const closeTasks = createAsyncThunk('tasks/closeTasks', async (taskId) => {
    const res = await closeTask(taskId);
    return res;
})

export const deleteTaskById = createAsyncThunk('tasks/deleteTaskById', async (taskId) => {
    await deleteTask(taskId);
    return taskId;
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
        },
        [updateTasks.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const {id, data} = action.payload;
            let taskBeforeUpdate = state.todos.find((task) => task.id == id);
            taskBeforeUpdate = {...taskBeforeUpdate, ...data};
        },
        [closeTasks.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            console.log('taskSlice action : ', action);
            state.todos.find((task) => task.id == action.payload).completed = true;
        },
        [deleteTaskById.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            console.log('taskSlice delete action : ', action);
            state.todos = state.todos.filter((item) => item.id != action.payload);
        }
    }
})

export default taskSlice.reducer;

export const selectAllTasks = (state) => state.task.todos;
