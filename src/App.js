import './App.css';
import TaskList from './components/TaskList';
import AddNewTask from './components/AddNewTask';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import EditTask from './components/EditTask';
import Comments from './components/comments/Comments';

function App() {

  return (
    <div>
      <NavBar />
      <div>
        <div className='row'>
          <div  className='col-md-3'>
            
          </div>
          <div className='col-md-9'>
            <div className='container'>
              <Switch>
                <Route exact path='/'>
                  <TaskList />
                </Route>
                <Route exact path='/addTask'>
                  <AddNewTask />
                </Route>
                <Route exact path='/editTask/:id' component={EditTask}>
                </Route>
                <Route exact path='/comments/:id' component={Comments}>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
