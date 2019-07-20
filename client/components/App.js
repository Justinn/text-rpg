import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HorizontalBar from './navigation/HorizontalBar';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Router>
        <HorizontalBar />
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
