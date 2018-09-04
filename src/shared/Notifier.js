import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

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

  openSnackbar = ({ message }) => {
    console.log("snacbar function called")
    this.setState({
      open: true,
      message,
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
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
        message={message}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
      />
    );
  }
}

export function openSnackbar({ message }) {
  console.log("snackbar called", message)
  openSnackbarFn({ message });
}

export default Notifier;