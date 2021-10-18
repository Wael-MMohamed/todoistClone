import {Route, Switch} from 'react-router-dom';
import Edit from './pages/Edit';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import Comment from './pages/Comment';

function App() {

  return (
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
            <Route exact path='/editTask/:id' component={Edit}>
            </Route>
            <Route exact path='/comments/:id' component={Comment}>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
