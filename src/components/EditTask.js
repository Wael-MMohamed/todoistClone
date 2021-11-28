import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateTasks } from "./taskSlice";
import { useHistory } from "react-router-dom";

export default function EditTask(props){

    const taskId = Number(props.task_id);
    const dispach = useDispatch();
    const todoList = useSelector(state => state.task.todos);
    const taskContent = todoList.find((item) => item.id == taskId).content;
    const taskPriority = todoList.find((item) => item.id == taskId).priority;

    const [newContent, setNewContent] = useState('');
    const [newPriority, setNewPriority] = useState(1);
    let history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        let updates = {
            'id' : taskId,
            'data' : {
                'content' : newContent,
                'priority' : newPriority
            }
        }
        dispach(updateTasks(updates));
        history.push('/');
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder={taskContent} value={newContent} 
                onChange={(prev) => {
                    prev = prev.target.value;
                    setNewContent(prev);
                }}/>
                <span className="input-group-text" id="basic-addon2">Task</span>
            </div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder={taskPriority} value={newPriority}
                onChange={(prev) =>{
                    prev = prev.target.value;
                    setNewPriority(Number(prev));
                }} />
                <span className="input-group-text" id="basic-addon2">priority</span>
            </div>
                <button className='btn btn-primary' onClick={handleSubmit}>Save Changes</button>
        </div>
    )
}