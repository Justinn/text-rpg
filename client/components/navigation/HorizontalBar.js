import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class HorizontalBar extends React.Component {
  render() {
    const loggedIn = this.props.user.username;

    return (
      <div className="horizontal-navbar">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {loggedIn ? (
            <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
          ) : (
            <React.Fragment>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  null
)(HorizontalBar);
