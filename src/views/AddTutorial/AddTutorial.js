import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as NavLink, Redirect, withRouter } from "react-router-dom";
import { create, createTutorial } from "../../actions/tutorials";

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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

const AddTutorial = (props) => {
  const classes = useStyles();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [openMessage, setOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleCloseMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    if(e.target.name === 'title'){
      const title = e.target.value;
      setTitle(title);
    }
    else if(e.target.name === 'content'){
      const content = e.target.value;
      setContent(content);
    }
  }

  const handlePost = (e) => {
    e.preventDefault();
    console.log('create data: ', [title, content]);
    setLoading(true);
    setSuccessful(false);
    dispatch(create(title, content))
      .then(() => {
        props.history.push('/tutorials');
      })
      .catch((error) => {
        setLoading(false);
        setOpen(true);
        console.log('error: ', error);
      });
  }

  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />;
  // }

  // return (
  //   <div className="submit-form">
  //     {submitted ? (
  //       <div>
  //         <h4>You submitted successfully!</h4>
  //         <button className="btn btn-success" onClick={newTutorial}>
  //           Add
  //         </button>
  //       </div>
  //     ) : (
  //       <div>
  //         <div className="form-group">
  //           <label htmlFor="title">Title</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="title"
  //             required
  //             value={tutorial.title}
  //             onChange={handleInputChange}
  //             name="title"
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="description">Description</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="description"
  //             required
  //             value={tutorial.description}
  //             onChange={handleInputChange}
  //             name="description"
  //           />
  //         </div>

  //         <button onClick={saveTutorial} className="btn btn-success">
  //           Submit
  //         </button>
  //       </div>
  //     )}
  //     <Link to="/tutorials">Tutorials</Link>
  //   </div>
  // );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Новый пост
        </Typography>
        <ValidatorForm 
          noValidate
          onSubmit={handlePost}
          onError={errors => console.log(errors)}
          className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Заголовок"
                autoFocus
                value={title}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Введите заголовок']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Содержимое"
                name="content"
                autoComplete="lname"
                value={content}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Введите содержимое']}
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
                'запостить'
              )}
          </Button>
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
};

export default withRouter(AddTutorial);