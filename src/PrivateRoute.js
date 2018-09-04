import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "./utils/auth";

class PrivateRoute extends Component {

  constructor(props) {
    super(props)
    console.log("cons")
    this.state = {
      loading: true,
      isAuthenticated: false,
      currentUser: null
    }
  }

  componentDidMount() {
    console.log("did mount")
    auth.checkUser((err, user) => {
      console.log("user", user)
      console.log(!err)
      if (!err) {
        return this.setState({
          isAuthenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        return this.setState({
          isAuthenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    console.log("auth", this.state.isAuthenticated);
    console.log("auth from auth ", auth.isAuthenticated);

    // if (this.props.location.state.isAuthenticated) {
    //   console.log("loading", this.props.location.state.isAuthenticated);
    // }

    if (this.state.loading === true) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route
          {...rest}
          render={
            props => auth.isAuthenticated ? (
              <Component {...props} {...rest} />
            ) : (
                <Redirect to={
                  {
                    pathname: '/login',
                    state: { from: props.location }
                  }
                } />
              )

          }
        />
      )
    }

    // return (
    // <Route {...rest} render={props => (
    //   <div>
    //     {!this.state.isAuthenticated && <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />}
    //     <Component {...this.props} />
    //   </div>
    // )}
    // />
    // <Route
    //   {...rest}
    //   render={
    //     props => this.state.isAuthenticated ? (
    //       <Component {...props} {...rest} />
    //     ) : (
    //         <Redirect to='/login' />
    //       )

    //   }
    // />

    // <Route
    //   {...rest}
    //   render={
    //     props => auth.getToken() !== null ? (
    //       <Component {...props} {...rest} />
    //     ) : (
    //         <Redirect to='/login' />
    //       )

    //   }
    // />

    // <Route
    //   {...rest}
    //   render={props =>
    //     this.state.isAuthenticated ? (
    //       <Component {...props} {...rest} />
    //     ) : (
    //         this.state.loading ? (
    //           <div>LOADING</div>
    //         ) : (
    //             <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
    //           )
    //       )
    //   }
    // />
    // )
    // }
    //   return (
    //     <Route
    //       {...rest}
    //       render={
    //         props => authenticated === true ? (
    //           // props => data === true ? (
    //           <Component {...props} {...rest} />
    //         ) : (
    //             <Redirect to='/login' />
    //           )

    //       }
    //     />
    //   )
  }
}

export default PrivateRoute;

// export default function PrivateRoute({
//   component: Component,
//   authenticated,
//   ...rest
// }) {
//   return (
//     <Route
//       {...rest}
//       render={
//         props => authenticated === true ? (
//           // props => data === true ? (
//           <Component {...props} {...rest} />
//         ) : (
//             <Redirect to='/login' />
//           )

//       }
//     />
//   )
// }
