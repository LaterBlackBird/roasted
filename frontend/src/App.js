import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        Home
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route>
        Temp 404 Page
      </Route>
    </Switch>
  );
}

export default App;
