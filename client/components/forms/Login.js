import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/reducers';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      msg: { text: '', color: 'white' },
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    try {
      await this.props.login(username, password);
      this.props.history.push('/');
    } catch (error) {
      this.sendMsg('Invalid username or Password.', 'red');
    }
  };

  sendMsg = (msg, color) => {
    this.setState({ msg: { text: msg, color: color } });
  };

  render() {
    return (
      <div className="login form">
        <h3>Login</h3>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>
                <input
                  type="text"
                  name="username"
                  maxLength="30"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  maxLength="25"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="submit"
                  name="login"
                  value="Login"
                  onClick={this.handleLogin}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.msg.text ? (
          <p style={{ color: this.state.msg.color }}>{this.state.msg.text}</p>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
