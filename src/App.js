import React from 'react';
import './App.css';
import {Route,Redirect} from 'react-router-dom'
import Departmens from './departmens/Departments'

function App() {
  return (
    <div className="app">
      <Route path='/:page'  component={Departmens}/>
      <Redirect from={'/'} to={'/1'}/>
    </div>
  );
}

export default App;
