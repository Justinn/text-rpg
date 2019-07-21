import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import HorizontalBar from './navigation/HorizontalBar';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Home from './Home';
import { getAuth } from '../store/reducers/';
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
