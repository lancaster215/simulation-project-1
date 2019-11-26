import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Login from '../Login/Login';
import { Link, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    const classes = useStyles();
    const [values, setValues] = useState({
      fname: '',
      lname: '',
      email: '',
      uname: '',
      cpass: '',
      pass: '',
      active: false,
      success: false,
      showPassword: false,
      error: false,
    });

    const signthis = () =>{
      if(values.cpass === values.pass){
        axios
        .post('http://localhost:3000/register', {
          "firstName": values.fname,
          "lastName": values.lname,
          "email": values.email,
          "username": values.uname,
          "password": values.pass,
          "plainpassword": values.pass,
          "active": true,
        }).then(res => {
          alert('Success!');
          setValues({...values, success: true});
        }).catch(err => setValues({...values, error: true}))
      }else{
        alert('Password did not match')
      }
    }
    if(values.success){
      return (<Redirect to='/login'/>)
    }
    const eventhandler = (e) =>{
      let prevdata = Object.assign({}, values)
      prevdata[e.target.name] = e.target.value;
      setValues(prevdata)
    }
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = event => {
      event.preventDefault();
    };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
          <PersonPinIcon fontSize="large"/>
        {/* </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm
          className={classes.form}
          onSubmit={signthis}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="fname"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                errorMessages={['This field is required', 'Must contain letters only.']}
                onChange={eventhandler}
                value={values.fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                errorMessages={['This field is required', 'Must contain letters only.']}
                onChange={eventhandler}
                value={values.lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'email is not valid']}
                onChange={eventhandler}
                value={values.email}
              />
            </Grid>
            {(values.error)? <p className="error">Email already exist!</p>:(null)}
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="uname"
                autoComplete="username"
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={eventhandler}
                value={values.uname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                name="pass"
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={eventhandler}
                value={values.pass}
                InputProps={{
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                name="cpass"
                variant="outlined"
                fullWidth
                type="password"
                id="confirmpass"
                label="Confirm Password"
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={eventhandler}
                value={values.cpass}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </ValidatorForm>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
              <Switch>
                <Route component={Login} path='/login'/>
              </Switch>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}