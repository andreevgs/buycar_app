import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setParams, setModels, setGenerations } from "../../actions/constructor";

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

export default function CreateOffer(props) {
  const classes = useStyles();

  const constructor = useSelector(state => state.constructor);
  const dispatch = useDispatch();

  const [constructorData, setConstructorData] = useState('');

  const [checkedMark, setCheckedMark] = useState('');
  const [checkedModel, setCheckedModel] = useState('');
  const [checkedGeneration, setCheckedGeneration] = useState('');
  const [checkedYear, setCheckedYear] = useState('');
  const [checkedBody, setCheckedBody] = useState('');
  const [checkedState, setCheckedState] = useState('');
  const [checkedEngine, setCheckedEngine] = useState('');
  const [checkedCapacity, setCheckedCapacity] = useState('');
  const [checkedUnit, setCheckedUnit] = useState('');

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingStatusModel, setLoadingStatusModel] = useState(true);
  const [loadingStatusGeneration, setLoadingStatusGeneration] = useState(true);

  useEffect(() => {
    dispatch(setParams()).then(() => {
        setConstructorData(constructor);
        setLoadingStatus(false);
        console.log('constructor: ', constructorData);
        console.log('constructor: ', constructor);

    });
  }, []);

  const handleMark = (_, value) => {
    if(value){
      if(checkedModel){
        setCheckedModel('');
      }
      if(checkedGeneration){
        setCheckedGeneration('');
      }
      setCheckedMark(value);
      console.log('mark: ', value);
      dispatch(setModels(value.id))
        .then(() => {
          console.log('checkedParams: ', checkedMark);
          setLoadingStatusModel(false);
        });
    }
    else {
      setCheckedMark('');
      setCheckedModel('');
      setCheckedGeneration('');
      setLoadingStatusModel(true);
      setLoadingStatusGeneration(true);
      console.log('checkedParams: ', checkedMark);
    }
  }

  const handleModel = (_, value) => {
    if(value){
      if(checkedGeneration){
        setCheckedGeneration('');
      }
      setCheckedModel(value);
      console.log('model: ', value);
      dispatch(setGenerations(value.id))
        .then(() => {
          setLoadingStatusGeneration(false);
        });
    }
    else {
      setCheckedModel('');
      setCheckedGeneration('');
      setLoadingStatusGeneration(true);
    }
  }

  const handleGeneration= (_, value) => {
    if(value){
      setCheckedGeneration(value);
    }
    else {
      setCheckedGeneration('');
    }
  }

  const handleOffer = () => {
    console.log('years: ', constructor.years);
    console.log('year: ', checkedYear);
  }

  return (
    <React.Fragment>
      <CssBaseline />
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
                        id="mark"
                        options={constructor.marks || []}
                        getOptionLabel={option => option.title || option.name}
                        value={checkedMark}
                        onChange={handleMark}
                        renderInput={params => {
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Марка *"
                              fullWidth
                            />
                          );
                        }}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <Autocomplete
                        disabled={loadingStatusModel}
                        id="model"
                        options={constructor.models || []}
                        getOptionLabel={option => option.title || option.name}
                        value={checkedModel}
                        onChange={handleModel}
                        renderInput={params => {
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Модель *"
                              fullWidth
                            />
                          );
                        }}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <Autocomplete
                        disabled={loadingStatusGeneration}
                        id="generation"
                        options={constructor.generations || []}
                        getOptionLabel={option => option.generation || option.name}
                        value={checkedGeneration}
                        onChange={handleGeneration}
                        renderInput={params => {
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Поколение *"
                              fullWidth
                            />
                          );
                        }}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="year-label">Год выпуска *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="year-label-error"
                          id="year"
                          onChange={(_, value) => setCheckedYear(value)}
                          label="Год выпуска *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Год выпуска</em>
                            </MenuItem>
                            {constructor.years && (
                              constructor.years.map((year) => {
                                return <MenuItem value={year.id}>{String(year.value)}</MenuItem>
                                // console.log('124');
                              })
                            )}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="body-label">Тип кузова *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="body-label-error"
                          id="body"
                          onChange={(_, value) => setCheckedBody(value)}
                          label="Тип кузова *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Тип кузова</em>
                            </MenuItem>
                            {constructor.bodyTypes && (
                              constructor.bodyTypes.map((body) => {
                                console.log(body.id);
                                return <MenuItem value={body.id}>{body.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="state-label">Состояние *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="state-label-error"
                          id="state"
                          onChange={(_, value) => {setCheckedState(value.props); console.log('state: ', checkedState)}}
                          label="Состояние *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Состояние</em>
                            </MenuItem>
                            {constructor.states && (
                              constructor.states.map((state) => {
                                return <MenuItem value={state.id}>{state.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="engine-label">Двигатель *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="engine-label-error"
                          id="engine"
                          onChange={(_, value) => {setCheckedEngine(value.props); console.log('engine: ', checkedEngine)}}
                          label="Двигатель *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Двигатель</em>
                            </MenuItem>
                            {constructor.engineTypes && (
                              constructor.engineTypes.map((type) => {
                                return <MenuItem value={type.id}>{type.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="engine-label">Объём двигателя *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="engine-label-error"
                          id="engine"
                          onChange={(_, value) => {setCheckedCapacity(value.props); console.log('engine: ', checkedCapacity)}}
                          label="Объём двигателя *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Объём двигателя</em>
                            </MenuItem>
                            {constructor.capacityValues && (
                              constructor.capacityValues.map((val) => {
                                return <MenuItem value={val.id}>{String(val.value)}</MenuItem>
                              })
                            )}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="engine-label">Тип привода *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="engine-label-error"
                          id="engine"
                          onChange={(_, value) => {setCheckedUnit(value.props); console.log('engine: ', checkedUnit)}}
                          label="Тип привода *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Тип привода</em>
                            </MenuItem>
                            {constructor.units && (
                              constructor.units.map((unit) => {
                                return <MenuItem value={unit.id}>{unit.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                      </FormControl>
                      </Grid>
                      
                  </Grid>
                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleOffer}
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