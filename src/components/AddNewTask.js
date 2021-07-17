import { useDispatch} from 'react-redux';
import {addNewTask} from './taskSlice';
import { useState} from 'react';

export default function AddNewTask(){

    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [dueString, setDueString] = useState('tomorrow at 12:00');
    const [dueLang, setdueLang] = useState('en');
    const [priority, setPriority] = useState(1);

    const onSavePostClicked = (e) => {
    e.preventDefault();
    let data = {
        "content": content,
        "due_string": dueString,
        "due_lang": "en",
        "priority": priority,
        "project_id": 2269074557
    }
    dispatch(addNewTask(data));
    }

    return(
        <div className="App">
            <form>
                <label htmlFor="postTitle">Task :</label>
                <input
                type="text"
                placeholder="enter your task"
                value={content}
                onChange={(prev) => {
                    prev = prev.target.value;
                    setContent(prev);
                }}
                />
                <label htmlFor="dueDate">Due Date :</label>
                <input
                type="text"
                placeholder="enter date"
                value={dueString}
                onChange={(prev) => {
                    prev = prev.target.value;
                    setDueString(prev);
                }}
                />
                <label htmlFor="priority">priority :</label>
                <input
                type="text"
                placeholder="enter priority"
                value={priority}
                onChange={(prev) => {
                    prev = prev.target.value;
                    setPriority(prev);
                }}
                />
                <button type="button" onClick={onSavePostClicked} >
                Save Post
                </button>
            </form>
        </div>
    )
}