import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import HorizontalBar from './navigation/HorizontalBar';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Logout from './Logout';
import Home from './Home';
import Profile from './Profile'
import { getAuth } from '../store';
import store from '../store';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(getAuth());
  }

  render() {
    return (
      <div>
        <HorizontalBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
