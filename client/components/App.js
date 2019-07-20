import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HorizontalNavbar from './HorizontalNavbar';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Home from './Home';

const App = () => {
  return (
    <div>
      <HorizontalNavbar />
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
      </Router>
    </div>
  );
};

export default App;
