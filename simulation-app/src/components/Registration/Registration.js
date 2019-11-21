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
import Login from '../../App';
import { Link, Switch, Route } from 'react-router-dom';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    const classes = useStyles();
    var [fname, setfname] = useState('');
    var [lname, setlname] = useState('');
    var [email, setemail] = useState('');
    var [uname, setuname] = useState('');
    var [cpass, setcpass] = useState('');
    var [pass, setpass] = useState('');
    // const [submit, submitbtn] = useState({});

    const signthis = () =>{
      if(cpass === pass){
        axios
        .post('http://localhost:3000/register', {
          "firstName": fname,
          "lastName": lname,
          "email": email,
          "username": uname,
          // "password": md5(pass),
          "password": pass,
          "plainpassword": pass,
          "active": true,
        }).then(res => {
          localStorage.setItem('token', res.data.accessToken)
          alert('Success!');
          setfname('')
          setlname('')
          setemail('')
          setuname('')
          setcpass('')
          setpass('')
        })
      }else{
        alert('Password did not match')
      }
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm
          className={classes.form}
          // ref="form"
          onSubmit={signthis}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={(e)=>{setfname(e.target.value)}}
                value={fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={(e)=>{setlname(e.target.value)}}
                value={lname}
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
                onChange={(e)=>{setemail(e.target.value)}}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={(e)=>{setuname(e.target.value)}}
                value={uname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                name="confirmpass"
                variant="outlined"
                fullWidth
                type="password"
                id="confirmpass"
                label="Confirm Password"
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={(e)=>{setcpass(e.target.value)}}
                value={cpass}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}