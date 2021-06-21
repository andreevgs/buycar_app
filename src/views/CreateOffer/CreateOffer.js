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
import { DropzoneArea } from 'material-ui-dropzone';
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
  const [checkedTransmission, setCheckedTransmission] = useState('');
  const [checkedColor, setCheckedColor] = useState('');
  const [checkedInterior, setCheckedInterior] = useState('');
  const [checkedMaterial, setCheckedMaterial] = useState('');

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

  const handleOffer = (e) => {
    e.preventDefault();
    alert(111);
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
                      previewText="Прикреплённые файлы"
                      maxFileSize={5000000}
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
                        <InputLabel id="capacity-label">Объём двигателя *</InputLabel>
                        <Select
                          disabled={loadingStatus}
                          labelId="capacity-label-error"
                          id="capacity"
                          onChange={(_, value) => {setCheckedCapacity(value.props); console.log('capacity: ', checkedCapacity)}}
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
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="mileage"
                        label="Пробег (км) *"
                        variant="outlined"
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                      </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="cost"
                        label="Цена (USD) *"
                        variant="outlined"
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
                    >
                      Создать
                    </Button>
                  </div>
              </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </form>
    </React.Fragment>
  );
}