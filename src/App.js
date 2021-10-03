import './App.css';
import TaskList from './components/TaskList';
import AddNewTask from './components/AddNewTask';
import {Route, Switch} from 'react-router-dom';
import EditTask from './components/EditTask';
import Comments from './components/comments/Comments';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddTask from './pages/AddTask';

function App() {

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-9'>
            <div className='container'>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/addTask'>
                  <AddTask />
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
