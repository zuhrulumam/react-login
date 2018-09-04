import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <Button variant="raised" color="primary" label="Submit" style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};


export default Login;

function handleClick(event) {
  var apiBaseUrl = "http://localhost:4000/api/";
  var self = this;
  var payload = {
    "email": this.state.username,
    "password": this.state.password
  }
  axios.post(apiBaseUrl + 'login', payload)
    .then(function (response) {
      console.log(response);
      if (response.data.code == 200) {
        console.log("Login successfull");
        var uploadScreen = [];
        uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
        self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
      }
      else if (response.data.code == 204) {
        console.log("Username password do not match");
        alert("username password do not match")
      }
      else {
        console.log("Username does not exists");
        alert("Username does not exist");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}