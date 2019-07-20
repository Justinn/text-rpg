import React from 'react';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      email: '',
      error: '',
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSignup = (evt) => {
    evt.preventDefault();
    this.sendError('Under constructon');
  };

  sendError = msg => {
    this.setState({ error: msg });
  };

  render() {
    return (
      <div className="form">
        <h3>Signup</h3>
        <form onSubmit={this.handleSignup}>
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
                    required
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
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Verify Password:</td>
                <td>
                  <input
                    type="password"
                    name="verifyPassword"
                    value={this.state.verifyPassword}
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="submit"
                    value="Signup"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {this.state.error ? <p className="error">{this.state.error}</p> : ''}
        </form>
      </div>
    );
  }
}

export default Signup;
