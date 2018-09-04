import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import LoginView from "./LoginView";

import axios from 'axios'

import auth from "../../utils/auth";

import { openSnackbar } from '../../shared/Notifier';

class Login extends Component {
  state = {
    isLogin: false,
  }

  handleLogin = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    console.log(email)
    console.log(password)

    axios.post('http://localhost:4000/api/v1/users/login',
      {
        email: email.value,
        password: password.value
      })
      .then(response => {
        console.log(response);
        console.log(response.data.token);

        // set token
        auth.setToken(response.data.token);
        auth.isAuthenticated = true;
        auth.username = response.data.username;
        this.setState({ isLogin: true })
        // this.props.history.push("/");
      })
      .catch(err => {
        openSnackbar({ message: "Login Error" })
        console.log(err)
      })

    console.log('submit');
  }

  render() {
    console.log("state login ", this.state.isLogin)
    console.log("props location", this.props.location)

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { isLogin } = this.state

    if (isLogin === true) {
      console.log("redir to homepage");
      return <Redirect to={from} />
    }

    return <LoginView onSubmit={this.handleLogin} />;
  }
}

export default withRouter(Login);
// export default Login;