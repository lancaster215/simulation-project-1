import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Registration from '../Registration/Registration';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    pass: '',
    error: false,
    success: false,
  })

  const loginthis = () =>{
    axios
    .post('http://localhost:3000/login', {
      "email": values.email,
      "password": values.pass,
    }).then((res,i)=>{
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('useremail', values.email)
      setValues({...values, success: true})
    })
    .catch(err => setValues({...values, error: true}))
  }
  if(values.success){
    return(<Redirect to='/usermanagement'/>)
  }
  if(localStorage.getItem('token')){
    return(<Redirect to='/usermanagement'/>)
  }
  const eventhandler = (e) =>{
    let prevdata = Object.assign({}, values);
    prevdata[e.target.name] = e.target.value;
    setValues(prevdata);
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
          <LockOutlinedIcon fontSize="large"/>
        {/* </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidatorForm 
          className={classes.form}
          onSubmit={loginthis}
          onError={errors => console.log(errors)}
        >
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
            margin="normal"
            autoFocus
          />
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
            margin="normal"
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
          {(values.error)? <p className="error">Invalid Password or Username!</p>:(null)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/registration' variant="body2">
                Don't have an account? Sign Up
              </Link>
              <Switch>
                <Route component={Registration} path='/registration'/>
              </Switch>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}