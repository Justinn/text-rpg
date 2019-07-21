import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/reducers';

class Logout extends React.Component {
  componentDidMount() {
    const loggedIn = this.props.user.username;
    if (loggedIn) this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return <div>Logging out..</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Logout)
);
