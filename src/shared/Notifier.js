import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import amber from '@material-ui/core/colors/amber';

import { withStyles } from '@material-ui/core/styles';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  // const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {/* <Icon className={classNames(classes.icon, classes.iconVariant)} /> */}
          {message}
        </span>
      }
      // action={[
      //   <IconButton
      //     key="close"
      //     aria-label="Close"
      //     color="inherit"
      //     className={classes.close}
      //     onClick={onClose}
      //   >
      //     <CloseIcon className={classes.icon} />
      //   </IconButton>,
      // ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

let openSnackbarFn;

class Notifier extends Component {
  state = {
    open: false,
    message: '',
  };

  componentDidMount() {
    console.log("snacbar mount")
    openSnackbarFn = this.openSnackbar;
  }

  openSnackbar = ({ message, variant }) => {
    console.log("snacbar function called")
    this.setState({
      open: true,
      message,
      variant
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
      variant: 'success'
    });
  };

  render() {
    console.log("open", this.state.open)
    const message = (
      <span
        id="snackbar-message-id"
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // message={message}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
      >
        <MySnackbarContentWrapper
          onClose={this.handleSnackbarClose}
          variant={this.state.variant}
          message={message}
        />
      </Snackbar>
    );
  }
}

export function openSnackbar({ message, variant }) {
  console.log("snackbar called", message)
  openSnackbarFn({ message, variant });
}

export default Notifier;