import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Registration from '../Registration/Registration';
import axios from 'axios';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  var [email, setemail] = useState('');
  var [pass, setpass] = useState('');
  var [error, seterror] = useState(false);
  var [success, setsuccess] = useState(false);

  const loginthis = () =>{
    axios
    .post('http://localhost:3000/login', {
      "email": email,
      "password": pass
    }).then((res,i)=>{
      localStorage.setItem('token', res.data.accessToken)
      setsuccess(true)
    })
    .catch(err => seterror(true))
  }
  if(success){
    return(<Redirect to='/usermanagement'/>)
  }
  if(localStorage.getItem('token')){
    return(<Redirect to='/usermanagement'/>)
  }
  // if(error === true){
  //   return(
  //     <React.Fragment>
  //       {alert('Incorrect Password')}
  //       {setemail('')}
  //       {setpass('')}
  //     </React.Fragment>
  //   )
  // }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
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
            onChange={(e)=>{setemail(e.target.value)}}
            value={email}
            margin="normal"
            autoFocus
          />
          <TextValidator
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            validators={['required']}
            errorMessages={['This field is required']}
            onChange={(e)=>{setpass(e.target.value)}}
            value={pass}
            margin="normal"
            autoComplete="current-password"
          />
          {(error)? <p className="error">Invalid Password!</p>:(null)}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
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
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}