import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {addNewTask} from './components/taskSlice';
import {useEffect, useState} from 'react';

function App() {
  // const dispatch = useDispatch();
  // const tasks = useSelector(selectAllTasks);

  // const taskStatus = useSelector((state) => state.task.status);
  // const error = useSelector((state) => state.task.error);

  // useEffect(() => {
  //   if(taskStatus === 'idle')dispatch(fetchTasks());
  // },[taskStatus,dispatch])

  // let content

  // if (taskStatus === 'loading') {
  //   content = <div className="loader">Loading...</div>
  // } else if (taskStatus === 'succeeded') {

  //   content = tasks.map((task) => (
  //     <li key={task.id} >{task.content}</li>
  //   ))
  // } else if (taskStatus === 'error') {
  //   content = <div>{error}</div>
  // }
      const dispatch = useDispatch();
      // const addNewTasks = useSelector(addNewTask);

      const [content, setContent] = useState('');
      const [dueString, setDueString] = useState('tomorrow at 12:00');
      const [dueLang, setdueLang] = useState('en');
      const [priority, setPriority] = useState('1');

      const onSavePostClicked = async (e) => {
        e.preventDefault();
        let data = {
          "content": content,
          "due_string": dueString,
          "due_lang": "en",
          "priority": priority,
          "project_id": 2269074557
        }
        let test = await dispatch(addNewTask(data));
        console.log('app event :' , test);
      }


  return (
    <div className="App">
      {/* <h2>tasks</h2>
      <ul>
        {content}
      </ul> */}
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
  );
}

export default App;
