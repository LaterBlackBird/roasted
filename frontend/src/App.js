import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route exact path='/'>
        Home
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route>
        
      </Route>
      <Route>
        Temp 404 Page
      </Route>
    </Switch>
  );
}

export default App;
