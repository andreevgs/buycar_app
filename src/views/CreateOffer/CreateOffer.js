import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setParams, setModels } from "../../actions/constructor";

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout(props) {
  const classes = useStyles();

  const constructor = useSelector(state => state.constructor);
  const dispatch = useDispatch();

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingStatusModel, setLoadingStatusModel] = useState(true);

  useEffect(() => {
    dispatch(setParams()).then(() => {
        setLoadingStatus(false);
        console.log('constructor: ', constructor);
    });
  }, []);
  
  const handleMark = (event, value) => {
    console.log('mark: ', value);
    dispatch(setModels(value.id))
      .then(() => {
        setLoadingStatusModel(false);
      });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <React.Fragment>
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Autocomplete
                        disabled={loadingStatus}
                        id="combo-box-demo"
                        options={constructor.marks}
                        getOptionLabel={(option) => option.name}
                        onChange={handleMark}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label={'Марка *'} variant="outlined" fullWidth />}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Autocomplete
                        disabled={loadingStatusModel}
                        id="combo-box-demo"
                        options={constructor.models}
                        getOptionLabel={(option) => option.name}
                        // onChange={handleMark}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label={'Модель *'} variant="outlined" fullWidth />}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Создать
                  </Button>
                </div>
              </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}