import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Splash from './components/Splash';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CoffeeList from "./components/CoffeeList";
import AddCoffeeForm from "./components/AddCoffeeForm";
import CoffeeEditForm from "./components/CoffeeEditForm";
import CheckinList from "./components/CheckinList";
import AddCheckinForm from "./components/AddCheckinForm";
import NotFound404 from "./components/NotFound404";
import AboutPage from "./components/About";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/coffees">
            <CoffeeList />
          </Route>
          <Route path="/coffees/new">
            <AddCoffeeForm />
          </Route>
          <Route path="/coffees/:id">
            <CoffeeEditForm />
          </Route>
          <Route exact path="/checkins">
            <CheckinList />
          </Route>
          <Route path="/checkins/new">
            <AddCheckinForm />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
