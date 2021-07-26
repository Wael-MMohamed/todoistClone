import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {addComment, fetchComments } from '../../api/client';
import Comments from "./Comments";

export const addNewComment = createAsyncThunk(("comments/addNewComment"), async (newComment) => {
    let res = await addComment(newComment);
    console.log('commentSlice response : ', res);
    return res;
})

export const fetchAllComments = createAsyncThunk(('comments/fetchAllComments'), async (taskId) => {
    let res = await fetchComments(taskId);
    return res;
})

export const commentSlice = createSlice({
    name : 'comments',
    initialState :{
        commentList : [],
        status : 'idle',
        error : null
    },
    reducers : {

    },
    extraReducers : {
        [addNewComment.fulfilled] : (state, action) => {
            state.status = 'idle';
            let allComments = state.commentList.push(action.payload);
        },
        [fetchAllComments.pending] :  (state, action) => {
            state.status = 'loading';
        },
        [fetchAllComments.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.commentList = action.payload;
        },
        [fetchAllComments.rejected] : (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export default commentSlice.reducer;