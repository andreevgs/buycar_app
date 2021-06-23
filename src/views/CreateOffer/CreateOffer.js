import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setParams, setModels, setGenerations, createOffer } from "../../actions/constructor";

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

  const dispatch = useDispatch();

  const constructor = useSelector(state => state.constructor);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const [loading, setLoading] = useState(false);
  const [openMessage, setOpen] = useState(false);

  const [constructorImages, setConstructorImages] = useState('');

  const [checkedMark, setCheckedMark] = useState('');
  const [checkedModel, setCheckedModel] = useState('');
  const [checkedGeneration, setCheckedGeneration] = useState('');
  const [checkedYear, setCheckedYear] = useState('');
  const [checkedBody, setCheckedBody] = useState('');
  const [checkedState, setCheckedState] = useState('');
  const [checkedEngine, setCheckedEngine] = useState('');
  const [checkedCapacity, setCheckedCapacity] = useState('');
  const [checkedUnit, setCheckedUnit] = useState('');
  const [checkedTransmission, setCheckedTransmission] = useState('');
  const [checkedColor, setCheckedColor] = useState('');
  const [checkedInterior, setCheckedInterior] = useState('');
  const [checkedMaterial, setCheckedMaterial] = useState('');
  const [mileage, setMileage] = useState('');
  const [cost, setCost] = useState('');

  const [validationError, setValidationError] = useState(false);
  const [activeEngine, setActiveEngine] = useState(false);
  const [controlledCapacityValue, setControlledCapacityValue] = useState('');

  const [checkedConditioning, setCheckedConditioning] = useState('');
  const [checkedHeadlight, setCheckedHeadlight] = useState('');
  const [checkedCruise, setCheckedCruise] = useState('');
  const [checkedCamera, setCheckedCamera] = useState('');
  const [checkedParking, setCheckedParking] = useState('');
  const [checkedSuspension, setCheckedSuspension] = useState('');
  const [checkedDisk, setCheckedDisk] = useState('');
  const [checkedRoof, setCheckedRoof] = useState('');

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingStatusModel, setLoadingStatusModel] = useState(true);
  const [loadingStatusGeneration, setLoadingStatusGeneration] = useState(true);

  useEffect(() => {
    dispatch(setParams()).then(() => {
        setLoadingStatus(false);
        console.log('constructor: ', constructor);

    });
  }, []);

  const handleCloseMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

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

  const validateAllFields = () => {
    if(
      checkedMark.name && 
      checkedModel.name && 
      checkedGeneration.generation && 
      checkedYear.value &&
      checkedBody.value &&
      checkedState.value &&
      checkedEngine.value &&
      (checkedCapacity.value || activeEngine) &&
      checkedUnit.value &&
      checkedTransmission.value &&
      checkedColor.value &&
      checkedInterior.value &&
      checkedMaterial.value &&
      mileage &&
      cost
    ){
      return true;
    }
    else{
      return false;
    }
  }

  const createObjectFromState = () => {
    return {
      checkedMark: checkedMark.id,
      checkedModel: checkedModel.id,
      checkedGeneration: checkedGeneration.id,
      checkedYear: checkedYear.value,
      checkedBody: checkedBody.value,
      checkedState: checkedState.value,
      checkedEngine: checkedEngine.value,
      checkedCapacity: checkedCapacity.value,
      checkedUnit: checkedUnit.value,
      checkedTransmission: checkedTransmission.value,
      checkedColor: checkedColor.value,
      checkedInterior: checkedInterior.value,
      checkedMaterial: checkedMaterial.value,
      mileage: mileage,
      cost: cost,
    }
  }

  const handleOffer = (e) => {
    e.preventDefault();
    if(validateAllFields()){
      setLoading(true);
      dispatch(createOffer(constructorImages, createObjectFromState())).then(() => {
        console.log('successss')
        props.history.push('/cars');
      }).catch((error) => {
        setLoading(false);
        setOpen(true);
        console.log('error: ', error);
      });
    }
    else {
      setValidationError(true);
    }
  }

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <form className={classes.layout} autoComplete="off" onSubmit={handleOffer}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Новое объявление
          </Typography>
          <React.Fragment>
              <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <DropzoneArea
                      filesLimit={20}
                      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                      dropzoneText={"Нажмите или перетащите сюда фотографии"}
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                      previewGridProps={{container: { spacing: 2, xs: 12}, item: { spacing: 2, xs: 12, sm: 6 }}}
                      previewText="Прикреплённые файлы:"
                      maxFileSize={5000000}
                      onChange={(files) => setConstructorImages(files)}
                    />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" gutterBottom>
                    Основные параметры
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
                              error={!checkedMark.name && validationError}
                              helperText={!checkedMark.name && validationError && "Укажите марку"}
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
                              error={!checkedModel.name && validationError}
                              helperText={!checkedModel.name && validationError && "Укажите модель"}
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
                              error={!checkedGeneration.generation && validationError}
                              helperText={!checkedGeneration.generation && validationError && "Укажите поколение"}
                            />
                          );
                        }}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedYear.value && validationError}>
                        <InputLabel id="year-label">Год выпуска *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="year-label-error"
                          id="year"
                          onChange={(_, value) => {setCheckedYear(value.props)}}
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
                        {!checkedYear.value && validationError && <FormHelperText>Укажите год выпуска</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedBody.value && validationError}>
                        <InputLabel id="body-label">Тип кузова *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="body-label-error"
                          id="body"
                          onChange={(_, value) => {setCheckedBody(value.props);console.log('body value: ', value.props);}}
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
                        {!checkedBody.value && validationError && <FormHelperText>Укажите тип кузова</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedState.value && validationError}>
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
                        {!checkedState.value && validationError && <FormHelperText>Укажите состояние</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedEngine.value && validationError}>
                        <InputLabel id="engine-label">Двигатель *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="engine-label-error"
                          id="engine"
                          onChange={(_, value) => {
                            if(value.props.value === 3){
                              setCheckedCapacity('');
                              setActiveEngine(true);
                              setControlledCapacityValue('');
                            }
                            else {
                              if(activeEngine){
                                setActiveEngine(false);
                              };
                              console.log('engine value: ', value.props);
                            }
                            setCheckedEngine(value.props);
                          }}
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
                        {!checkedEngine.value && validationError && <FormHelperText>Укажите тип двигателя</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedCapacity.value && !activeEngine && validationError}>
                        <InputLabel id="capacity-label">Объём двигателя *</InputLabel>
                        <Select
                          disabled={loadingStatus || activeEngine}
                          labelId="capacity-label-error"
                          id="capacity"
                          value={controlledCapacityValue}
                          onChange={(event, value) => {
                            setCheckedCapacity(value.props);
                            setControlledCapacityValue(event.target.value);
                            console.log('capacity: ', event.target.value);
                          }}
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
                        {!checkedCapacity.value && !activeEngine && validationError && <FormHelperText>Укажите объём двигателя</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedUnit.value && validationError}>
                        <InputLabel id="unit-label">Тип привода *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="unit-label-error"
                          id="unit"
                          onChange={(_, value) => {setCheckedUnit(value.props); console.log('unit: ', checkedUnit)}}
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
                        {!checkedUnit.value && validationError && <FormHelperText>Укажите тип привода</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="mileage"
                        label="Пробег (км) *"
                        variant="outlined"
                        onChange={(e) => {setMileage(e.target.value)}}
                        error={!mileage && validationError}
                        helperText={!mileage && validationError && "Укажите пробег"}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedTransmission.value && validationError}>
                        <InputLabel id="transmission-label">Коробка *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="transmission-label-error"
                          id="transmission"
                          onChange={(_, value) => {setCheckedTransmission(value.props); console.log('transmission: ', checkedTransmission)}}
                          label="Коробка *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Коробка</em>
                            </MenuItem>
                            {constructor.transmissions && (
                              constructor.transmissions.map((transmission) => {
                                return <MenuItem value={transmission.id}>{transmission.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                        {!checkedTransmission.value && validationError && <FormHelperText>Укажите тип коробки</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedColor.value && validationError}>
                        <InputLabel id="color-label">Цвет *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="color-label-error"
                          id="color"
                          onChange={(_, value) => {setCheckedColor(value.props); console.log('color: ', checkedColor)}}
                          label="Цвет *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Цвет</em>
                            </MenuItem>
                            {constructor.colors && (
                              constructor.colors.map((color) => {
                                return <MenuItem value={color.id}>{color.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                        {!checkedColor.value && validationError && <FormHelperText>Укажите цвет</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedMaterial.value && validationError}>
                        <InputLabel id="material-label">Материал отделки салона *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="material-label-error"
                          id="material"
                          onChange={(_, value) => {setCheckedMaterial(value.props); console.log('material: ', checkedMaterial)}}
                          label="Материал отделки салона *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Материал отделки салона</em>
                            </MenuItem>
                            {constructor.materials && (
                              constructor.materials.map((material) => {
                                return <MenuItem value={material.id}>{material.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                        {!checkedMaterial.value && validationError && <FormHelperText>Укажите материал</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!checkedInterior.value && validationError}>
                        <InputLabel id="interior-label">Цвет салона *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="interior-label-error"
                          id="interior"
                          onChange={(_, value) => {setCheckedInterior(value.props); console.log('interior: ', checkedInterior)}}
                          label="Цвет салона *"
                          fullWidth
                          >
                            <MenuItem value="">
                                <em>Цвет салона</em>
                            </MenuItem>
                            {constructor.interiors && (
                              constructor.interiors.map((interior) => {
                                return <MenuItem value={interior.id}>{interior.name_ru}</MenuItem>
                              })
                            )}
                        </Select>
                        {!checkedInterior.value && validationError && <FormHelperText>Укажите цвет салона</FormHelperText>}
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="cost"
                        label="Цена (USD) *"
                        variant="outlined"
                        onChange={(e) => {setCost(e.target.value)}}
                        error={!cost && validationError}
                        helperText={!cost && validationError && "Укажите цену"}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        id="about"
                        label="Расскажите про свой автомобиль"
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Дополнительные параметры
                      </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="conditioning-label">Кондиционер</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="conditioning-label-error"
                            id="conditioning"
                            onChange={(_, value) => {setCheckedConditioning(value.props); console.log('interior: ', checkedConditioning)}}
                            label="Кондиционер"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Кондиционер</em>
                            </MenuItem>
                            {constructor.conditioningTypes && (
                              constructor.conditioningTypes.map((type) => {
                                return <MenuItem value={type.id}>{type.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="headlight-label">Оптика и свет</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="headlight-label-error"
                            id="headlight"
                            onChange={(_, value) => {setCheckedHeadlight(value.props); console.log('interior: ', checkedHeadlight)}}
                            label="Оптика и свет"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Оптика и свет</em>
                            </MenuItem>
                            {constructor.headlights && (
                              constructor.headlights.map((headlight) => {
                                return <MenuItem value={headlight.id}>{headlight.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="cruise-label">Круиз-контроль</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="cruise-label-error"
                            id="cruise"
                            onChange={(_, value) => {setCheckedCruise(value.props); console.log('interior: ', checkedCruise)}}
                            label="Круиз-контроль"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Круиз-контроль</em>
                            </MenuItem>
                            {constructor.cruiseTypes && (
                              constructor.cruiseTypes.map((type) => {
                                return <MenuItem value={type.id}>{type.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="cameras-label">Камеры</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="cameras-label-error"
                            id="cameras"
                            onChange={(_, value) => {setCheckedCamera(value.props); console.log('interior: ', checkedCamera)}}
                            label="Камеры"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Камеры</em>
                            </MenuItem>
                            {constructor.cruiseTypes && (
                              constructor.cameras.map((camera) => {
                                return <MenuItem value={camera.id}>{camera.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="parking-label">Датчики парковки</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="parking-label-error"
                            id="parking"
                            onChange={(_, value) => {setCheckedParking(value.props); console.log('interior: ', checkedParking)}}
                            label="Датчики парковки"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Датчики парковки</em>
                            </MenuItem>
                            {constructor.parkingTypes && (
                              constructor.parkingTypes.map((type) => {
                                return <MenuItem value={type.id}>{type.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="suspension-label">Подвеска</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="suspension-label-error"
                            id="suspension"
                            onChange={(_, value) => {setCheckedSuspension(value.props); console.log('interior: ', checkedSuspension)}}
                            label="Подвеска"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Подвеска</em>
                            </MenuItem>
                            {constructor.suspensions && (
                              constructor.suspensions.map((suspension) => {
                                return <MenuItem value={suspension.id}>{suspension.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="disk-label">Диски</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="disk-label-error"
                            id="disk"
                            onChange={(_, value) => {setCheckedDisk(value.props); console.log('interior: ', checkedDisk)}}
                            label="Диски"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Диски</em>
                            </MenuItem>
                            {constructor.disks && (
                              constructor.disks.map((disk) => {
                                return <MenuItem value={disk.id}>{disk.name_ru}</MenuItem>
                              })
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="roof-label">Крыша</InputLabel>
                          <Select
                            disabled={loadingStatus}
                            labelId="roof-label-error"
                            id="roof"
                            onChange={(_, value) => {setCheckedRoof(value.props); console.log('interior: ', checkedRoof)}}
                            label="Крыша"
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Крыша</em>
                            </MenuItem>
                            {constructor.roofTypes && (
                              constructor.roofTypes.map((roof) => {
                                return <MenuItem value={roof.id}>{roof.name_ru}</MenuItem>
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
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit"/>
                        ) : (
                          'создать'
                        )}
                    </Button>
                  </div>
              </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </form>
      <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
      <Alert onClose={handleCloseMessage} severity="error">
        {message}
      </Alert>
      </Snackbar>
    </React.Fragment>
  );
}