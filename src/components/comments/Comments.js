import { useState, useEffect } from "react";
import { addNewComment, fetchAllComments } from "./commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function Comments(props){

    const [commentContent, setCommentContent] = useState('');
    const taskId = Number(props.task_id);
    const dispatch = useDispatch();
    const commentStatus = useSelector(state => state.comment.status);
    const commentError = useSelector(state => state.comment.error);
    const commentsList = useSelector(state => state.comment.commentList);
    const history = useHistory();

    useEffect(() => {
        if(commentStatus === 'idle') dispatch(fetchAllComments(taskId));
        // console.log('active tasks : ', tasks);
    },[commentStatus,dispatch])

    let items

    if (commentStatus === 'loading') {
        items = <div className="loader">Loading...</div>
    } else if (commentStatus === 'succeeded') {

        items = commentsList.filter((item) => item.task_id == taskId).map((item) => (
            <li key={item.id} className='list-group-item'>
                {item.content}
                {/* <Link to={`/EditTask/${item.id}`}><i className="fal fa-pencil"></i></Link>
                <Link to={`/comments/${item.id}`}><i class="fal fa-comment-alt-lines"></i></Link> */}
            </li>
        ))
    } else if (commentStatus === 'error') {
        items = <div>{commentError}</div>
    }

    function handleClick(e){
        e.preventDefault();
        const newComment = {
            'task_id' : Number(taskId),
            'content' : commentContent
        }
        console.log('comment ui :', newComment);
        dispatch(addNewComment(newComment));
        history.push(`/comments/${taskId}`)
    }

    return (
        <div>
            <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder='add new comment' value={commentContent} 
                    onChange={(prev) => {
                        prev = prev.target.value;
                        setCommentContent(prev);
                    }}/>
                    <span className="input-group-text" id="basic-addon2">Comment</span>
                    <button className='btn btn-primary' onClick={handleClick}>Save Comment</button>
            </div>
            <ul>{items}</ul>
        </div>
    )
}