import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleLogin = () => {};

  render() {
    return (
      <div id="login-form">
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>
                <input
                  type="text"
                  name="username"
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
                  onclick={this.handleLogin}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Login;
