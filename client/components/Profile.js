import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
  componentDidMount() {
    const loggedIn = this.props.user.username;
    if (!loggedIn) this.props.history.push('/');
  }

  render() {
    const loggedIn = this.props.user.username;
    if (!loggedIn) return <div />;

    return <div>Your tokens: {this.props.user.actionTokens}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Profile)
);
