import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import SignUpView from "./SignUpView";

import axios from 'axios'

import auth from "../../utils/auth";

import { openSnackbar } from '../../shared/Notifier';

class SignUp extends Component {
  state = {
    isLogin: false,
  }

  handleSignUp = async event => {
    event.preventDefault();
    const { email, password, username } = event.target.elements;

    console.log(email)
    console.log(password)

    axios.post('http://localhost:4000/api/v1/users/signup',
      {
        email: email.value,
        password: password.value,
        username: username.value
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
        openSnackbar({ message: "Signup Error", variant: 'error' })
        console.log(err)
      })

    console.log('submit');
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { isLogin } = this.state

    if (isLogin === true) {
      console.log("redir to homepage");
      return <Redirect to={from} />
    }
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default SignUp;