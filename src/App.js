import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import Loginscreen from './Loginscreen'

import { Route, BrowserRouter as Router } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import SignUp from "./pages/signup";
import Login from "./pages/login";

import PrivateRoute from "./PrivateRoute";

import auth from "./utils/auth";

class App extends Component {
  state = {
    loading: true,
    authenticated: false,
    user: null
  };

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isAuthenticated: false
    }
  }

  render() {
    const { authenticated, loading } = this.state;
    // if (loading) {
    //   return <p>Loading..</p>;
    // }
    console.log("render app called")
    return (
      <Router>
        <div>
          {/* <PrivateRoute exact path="/" component={HomePage} authenticated={authenticated} /> */}
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    );
  }

  componentWillMount() {
    console.log('component app will mount');

    // auth.checkUser(user => {
    //   console.log("user", user)
    //   if (user) {
    //     this.setState({
    //       authenticated: true,
    //       currentUser: user,
    //       loading: false
    //     });
    //   } else {
    //     this.setState({
    //       authenticated: false,
    //       currentUser: null,
    //       loading: false
    //     });
    //   }
    // });
  }
}

export default App;


