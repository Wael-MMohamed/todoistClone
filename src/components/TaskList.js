import {useSelector, useDispatch} from 'react-redux';
import {selectAllTasks, fetchTasks, closeTasks, deleteTaskById} from './taskSlice';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


export default function TaskList() {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const taskSearch = useSelector((state) => state.task.search);
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
            
            // console.log(completeState);
        }
    },[taskStatus,dispatch,...tasks])

    let items

    if (taskStatus === 'loading') {
        items = <div className="loader">Loading...</div>
    } else if (taskStatus === 'succeeded') {
        let data = taskSearch === '' ? tasks : tasks.filter(item => item.content.includes(taskSearch));
        items = data.map((item) => (
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
                <Link className='m-1' style={{ color: 'black'}} to={`/EditTask/${item.id}`} data-bs-toggle='tooltip' data-bs-placement='top' title='Edit'><CreateOutlinedIcon /></Link>
                <Link className='m-1' style={{ color: 'black'}} to={`/comments/${item.id}`} data-bs-toggle='tooltip' data-bs-placement='top' title='Comments'><MessageOutlinedIcon /></Link>
                <Link className='m-1' style={{ color: 'black'}} data-bs-toggle='tooltip' data-bs-placement='top' title='Delete' onClick={() => {
                    handleDelete(item.id);
                }}><DeleteOutlineSharpIcon /></Link>
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
            <Link className='m-3 p-2' style={{textDecoration: 'none'}} to='/addTask'><AddCircleOutlineOutlinedIcon /> Add Task</Link>
        </div>
        
        
    )
}