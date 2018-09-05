import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import auth from "../utils/auth";
import { Redirect } from "react-router-dom";

import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class HomePage extends Component {
  state = {
    isLoggedIn: auth.isAuthenticated,
    username: auth.username
  }
  handleLogout = (e) => {
    e.preventDefault();
    auth.isAuthenticated = false;
    auth.username = "";
    auth.clearToken();
    this.setState({ isLoggedIn: false })
  }

  render() {
    const { classes } = this.props;

    if (!this.state.isLoggedIn) {
      return <Redirect to='/login' />;
    }

    return (
      <div className={classes.root} data-testid="homepage" id="homepage">
        {/* <div className="homepage"> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Coding Test
          </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleLogout}
              data-testid="signoutBtn"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <br />
            <Typography variant="headline">Welcome In Home Page {this.state.username}</Typography>
          </Paper>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);