import {useSelector, useDispatch} from 'react-redux';
import {selectAllTasks, fetchTasks, closeTasks, deleteTaskById} from './taskSlice';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function TaskList() {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);

    const taskStatus = useSelector((state) => state.task.status);
    const error = useSelector((state) => state.task.error);
    let commentStatus = useSelector((state) => state.comment.status);
    const completeState = useSelector((state) => state);
    const [taskCompleted, setTaskCompleted] = useState(false);

    function handleDelete(id){
        dispatch(deleteTaskById(id));
    }

    useEffect(() => {
        if(taskStatus === 'idle'){
            dispatch(fetchTasks());
            
            console.log(completeState);
        }
        // console.log('active tasks : ', tasks);
    },[taskStatus,dispatch])

    let items

    if (taskStatus === 'loading') {
        items = <div className="loader">Loading...</div>
    } else if (taskStatus === 'succeeded') {

        items = tasks.map((item) => (
            <li key={item.id} className='list-group-item'>
                <input className='form-check-input' type='radio' value={taskCompleted}
                onChange={(prev) =>{
                    prev = !prev.target.value;
                    setTaskCompleted(prev);
                    dispatch(closeTasks(item.id));
                }}/>
                {item.content}
                <h6>{item.comment_count} comments</h6>
                <Link to={`/EditTask/${item.id}`}><i className="fal fa-pencil"></i></Link>
                <Link to={`/comments/${item.id}`}><i class="fal fa-comment-alt-lines"></i></Link>
                <Link onClick={() => {
                    handleDelete(item.id);
                }}><i class="fal fa-trash-alt"></i></Link>
            </li>
        ))
    } else if (taskStatus === 'error') {
        items = <div>{error}</div>
    }
    
    return(
        <div>
            <ul className='list-group'>
                {items}
            </ul>
            <Link to='/addTask'><i className="fal fa-plus-circle"></i>Add Task</Link>
        </div>
        
        
    )
}