import {useSelector, useDispatch} from 'react-redux';
import {selectAllTasks, fetchTasks, closeTasks, deleteTaskById} from './taskSlice';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function TaskList() {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const history = useHistory();

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
            <li key={item.id} className='list-group-item d-flex'>
                <div className='me-auto'>
                    <div className='d-flex'>
                        <input className='form-check-input m-1' type='radio' value={taskCompleted}
                        onChange={(prev) =>{
                            prev = !prev.target.value;
                            setTaskCompleted(prev);
                            dispatch(closeTasks(item.id));
                            history.push('/');
                        }}/>
                        <div>
                            <p className='m-0'>
                                <h5>{item.content}</h5>
                            </p>
                            <small className='m-0' style={{paddingRight: 10}}>{item.comment_count} comments</small>
                            <small className='m-0'>{item.due.string}</small>
                        </div>
                        
                    </div>
                </div>
                <Link className='m-1' to={`/EditTask/${item.id}`} data-bs-toggle='tooltip' data-bs-placement='top' title='Edit'><i className="fal fa-pencil"></i></Link>
                <Link className='m-1' to={`/comments/${item.id}`} data-bs-toggle='tooltip' data-bs-placement='top' title='Comments'><i class="fal fa-comment-alt-lines"></i></Link>
                <Link className='m-1' data-bs-toggle='tooltip' data-bs-placement='top' title='Delete' onClick={() => {
                    handleDelete(item.id);
                }}><i class="fal fa-trash-alt"></i></Link>
            </li>
        ))
    } else if (taskStatus === 'error') {
        items = <div>{error}</div>
    }
    
    return(
        <div>
            <ul className='list-group mb-3'>
                {items}
            </ul>
            <Link className='m-3 p-2' to='/addTask'><i className="fal fa-plus-circle"></i>Add Task</Link>
        </div>
        
        
    )
}