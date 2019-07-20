import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      email: '',
      msg: { text: '', color: 'white' },
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSignup = async evt => {
    evt.preventDefault();
    const { username, password, verifyPassword, email } = this.state;
    if (password === verifyPassword) {
      try {
        let request = await axios.post(
          'http://localhost:43594/api/user/signup',
          {
            username,
            password,
            email,
          }
        );
        const user = request.data;
        this.sendMsg('User created!', 'green');
      } catch (error) {
        this.sendMsg('Username already exists.', 'red');
      }
    } else this.sendMsg('Your passwords do not match.', 'red');
  };

  sendMsg = (msg, color) => {
    this.setState({ msg: { text: msg, color: color } });
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
                  <input type="submit" value="Signup" />
                </td>
              </tr>
            </tbody>
          </table>
          {this.state.msg.text ? (
            <p style={{ color: this.state.msg.color }}>{this.state.msg.text}</p>
          ) : (
            ''
          )}
        </form>
      </div>
    );
  }
}

export default Signup;
