import React from "react";
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import './Header.css';


function getModalStyle() {
  
  return {
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
    height:'100%',
    display:'block'
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2)
  },
  lrtab: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  loginStyle: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  }
}));

export default function Header() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

const [loggedin, setLoggedin] = React.useState(false);
//   const [inputs, setInputs] = useState({
//     username: '',
//     password: ''
// });

  const[username,setUsername] = React.useState("");
  const[password,setPassword] = React.useState("");
  const[invalidlogin,setInvalidLogin] = React.useState("");

 const inputUsernameChangeHandler = (e) => {
      setUsername(e.target.value);
      //console.log(username);
    
}

const inputPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
    //console.log(password);
  
}

const loginClickHandler = async() => {
    console.log(window.btoa(username + ":" + password))
    
    
const requestOptions = {
  method: 'POST',
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "authorization": "Basic " + window.btoa(username + ":" + password)
  }
}

try {


const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', requestOptions)
console.log(window.btoa({username:password}))

const result = await rawResponse.json();
        if(rawResponse.ok) {
          console.log(result);
          setLoggedin(true);
          setUsername("")
          setPassword("")
          handleClose();
          setInvalidLogin("");
        } 
        else {
          const error = new Error();
          error.message = result.message || 'Something went wrong.';
            setInvalidLogin("Invalid username of password")
        }

} catch(e) {
  alert(`Error: ${e.message}`);
}
}


  const body = (
      
    <div className={classes.lrtab}>
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Login" {...a11yProps(0)} />
        <Tab label="Register" {...a11yProps(1)} />
        
      </Tabs>
    </AppBar>
    
      <TabPanel value={value} index={0} dir={theme.direction}>
        Login
        <form className={classes.loginStyle} noValidate autoComplete="off">
    <div>
                      <FormControl required>
                          <InputLabel htmlFor="username">Username</InputLabel>
                          <Input id="username" type="text" value={username} onChange={inputUsernameChangeHandler} />
                          <FormHelperText className="">
                              <span className="red">required</span>
                          </FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl required>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input id="password" type="password" value={password} onChange={inputPasswordChangeHandler} />
                          <FormHelperText className="">
                              <span className="red">required</span>
                          </FormHelperText>
                      </FormControl>
                     <br/> <div className="invalidlogin">{invalidlogin}</div>
    
                      <br />
                      <Button
                          variant="contained"
                          type="button"
                          color="primary"
                          onClick={loginClickHandler}
                      >Login </Button>
                  </div>
              </form>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Register
        <form className={classes.loginStyle} noValidate autoComplete="off">
    <div>
      <TextField required id="standard-required" label="First Name"  />
      <TextField required id="standard-required" label="Last Name" />
      <TextField required type="email" id="standard-required" label="Email" />
      
      <TextField required
        id="standard-password-input"
        label="Password"
        type="password"
        
      />
    <TextField required type="number" id="standard-required" label="Contact No." />
    <br/> <br/>
    <Button
      variant="contained"
      type="button"
      color="primary"
      onClick=""
    >Register </Button>
    </div>
 </form>
      </TabPanel>

         
      </div>   
  );

  

  return (
    <div>
     <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo" />   
     {!loggedin ?
      <Button
        variant="contained"
        type="button"
        color="default"
        onClick={handleOpen}
        className="login-button"
      >
          
        Login
      </Button> :
      <Button
        variant="contained"
        type="button"
        color="default"
        onClick={handleOpen}
        className="login-button"
      >
          
        Logout
      </Button> }

      <Modal open={open} onClose={handleClose} style={modalStyle}>
        {body}
      </Modal>
      </header>
    </div>
  );
}
