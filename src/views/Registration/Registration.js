import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link as NavLink, withRouter, Redirect} from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { register, login } from "../../actions/auth";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Все права защищены © '}
      <Link color="inherit" href="https://buycar.by">
        BUYCAR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

function Registration(props) { 
  const classes = useStyles();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [loading, setLoading] = useState(false);
  const [openMessage, setOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
          return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isPasswordValid', (value) => {
      if (value.length < 6) {
          return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isPhoneValid', (value) => {
      if (/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/.test(value)) {
          return true;
      }
      return false;
    });
    
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('isPhoneValid');
    }
  });

  const handleCloseMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleChange = (e) => {
    if(e.target.name === 'name'){
      const name = e.target.value;
      setName(name);
    }
    else if(e.target.name === 'phone'){
      const phone = e.target.value;
      setPhone(phone);
    }
    else if(e.target.name === 'email'){
      const email = e.target.value;
      setEmail(email);
    }
    else if(e.target.name === 'password'){
      const password = e.target.value;
      setPassword(password);
    }
    else if(e.target.name === 'passwordRepeat'){
      const passwordRepeat = e.target.value;
      setPasswordRepeat(passwordRepeat);
    }
  }

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('reg data: ', [name, phone, email, password]);
    setLoading(true);
    setSuccessful(false);
    dispatch(register(name, phone, email, password))
      .then(() => {
        dispatch(login(email, password))
          .then(() => {
          })
          .catch((error) => {
            setLoading(false);
            setSuccessful(false);
            setOpen(true);
            console.log('error: ', error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setSuccessful(false);
        setOpen(true);
        console.log('error: ', error);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <ValidatorForm 
          noValidate
          onSubmit={handleRegistration}
          onError={errors => console.log(errors)}
          className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Ваше имя"
                autoFocus
                value={name}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Введите Ваше имя']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Номер телефона"
                name="phone"
                autoComplete="lname"
                value={phone}
                onChange={handleChange}
                validators={['required', 'isPhoneValid']}
                errorMessages={['Введите Ваш номер', 'Некорректный номер']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Адрес электронной почты"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                validators={['required', 'isEmail']}
                errorMessages={['Введите E-Mail', 'Некорректный адрес электронной почты']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
                validators={['required', 'isPasswordValid']}
                errorMessages={['Придумайте пароль', 'Пароль должен содержать не менее 6 символов']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="passwordRepeat"
                label="Повторите пароль"
                type="password"
                id="passwordRepeat"
                autoComplete="current-password"
                value={passwordRepeat}
                onChange={handleChange}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['Придумайте пароль', 'Пароли не совпадают']}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit"/>
              ) : (
                'зарегистрироваться'
              )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                <NavLink className={classes.link} to="/login">Уже есть аккаунт? Войти</NavLink>
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
      <Alert onClose={handleCloseMessage} severity="error">
        {message}
      </Alert>
      </Snackbar>
    </Container>
  );
}

export default withRouter(Registration);