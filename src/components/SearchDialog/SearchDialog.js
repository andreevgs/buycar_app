import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter, useParams, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ComboBox from '../ComboBox/ComboBox';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

import { setSearchParams, setSearchModels, setSearchGenerations, setOffers } from "../../actions/auto";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  FormContainer: {
      padding: theme.spacing(13, 2, 5, 2),
  },
  ControlBar: {
      boxSizing: "border-box",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: theme.spacing(2),
    //   paddingTop: theme.spacing(2),
    //   backgroundColor: '#fff',
      zIndex: 1100,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [param, setParam] = useState('');

  const [checkedMark, setCheckedMark] = useState('');
  const [checkedModel, setCheckedModel] = useState('');
  const [checkedGeneration, setCheckedGeneration] = useState('');

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingStatusModel, setLoadingStatusModel] = useState(true);
  const [loadingStatusGeneration, setLoadingStatusGeneration] = useState(true);

  const dispatch = useDispatch();

  const auto = useSelector(state => state.auto);

  const dropState = () => {
      setCheckedMark('');
      setCheckedModel('');
      setCheckedModel('');
  }

  useEffect(() => {
    console.log('pathgg: ', props.pathname);
    console.log('urlParamssss: ', props.urlParams);
    dispatch(setSearchParams())
        .then((data) => {
            setLoadingStatus(false);
            if(props.urlParams.mark){
                const mark = data.marks.find(mark => mark.system_id.toLowerCase() === props.urlParams.mark);
                setCheckedMark(mark);
                dispatch(setSearchModels(mark.id))
                    .then((data) => {
                        if(props.urlParams.model){
                            const model = data.models.find(model => model.system_id.toLowerCase() === props.urlParams.model);
                            setCheckedModel(model);
                            setLoadingStatusModel(false);
                            dispatch(setSearchGenerations(model.id))
                                .then((data) => {
                                    if(props.urlParams.generation){
                                        const generation = data.generations.find(generation => String(generation.id) == props.urlParams.generation);
                                        setCheckedGeneration(generation);
                                        setLoadingStatusGeneration(false);
                                    }
                                    else {
                                        setCheckedGeneration('');
                                    }
                                });
                        }
                        else {
                            setCheckedModel('');
                        }
                    });
            }
            else {
                setCheckedMark('');
            }
        });
  }, [props.page, props.pathname]);

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
      dispatch(setSearchModels(value.id))
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
      dispatch(setSearchGenerations(value.id))
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

  const handleGeneration = (_, value) => {
    if(value){
      setCheckedGeneration(value);
    }
    else {
      setCheckedGeneration('');
    }
  }

  const applyFilters = (event) => {
    console.log('clicked', props.history);
    event.preventDefault();
    // dispatch(setOffers(0, [
    //     checkedMark.system_id,
    //     checkedModel.system_id,
    //     checkedGeneration.id
    // ]));
    let url = '/cars';
    if(checkedMark){
        url += ('/' + checkedMark.system_id.toLowerCase());
        if(checkedModel){
            url += ('/' + checkedModel.system_id.toLowerCase());
            if(checkedGeneration){
                url += ('/' + checkedGeneration.id.toLowerCase());
            }
        }
    }
    props.history.push(url);
    // props.updateUrlParams({
    //     mark: checkedMark ? checkedMark.system_id.toLowerCase() : '',
    //     model: checkedModel ? checkedModel.system_id.toLowerCase() : '',
    //     generation: checkedGeneration ? checkedGeneration.id : ''
    // });
  }

  const handleChange = (event) => {
    setParam(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        открыть парамемтры поиска
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Параметры поиска
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" className={classes.FormContainer}>
            <form className={classes.form} noValidate onSubmit={applyFilters}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Состояние</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={param}
                            onChange={handleChange}
                            label="Состояние"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Состояние</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Autocomplete
                        disabled={loadingStatus}
                        id="mark"
                        options={auto.searchParameters ? (auto.searchParameters.marks ? auto.searchParameters.marks : []) : []}
                        getOptionLabel={option => option.title || option.name}
                        // value={checkedMark || (auto.searchParameters ? (auto.searchParameters.marks ? auto.searchParameters.marks[7] : '') : '')}
                        value={checkedMark}
                        onChange={handleMark}
                        renderInput={params => {
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Марка"
                              fullWidth
                            />
                          );
                        }}
                      />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Autocomplete
                    disabled={loadingStatusModel}
                    id="model"
                    options={auto.searchParameters ? (auto.searchParameters.models ? auto.searchParameters.models : []) : []}
                    getOptionLabel={option => option.title || option.name}
                    value={checkedModel}
                    onChange={handleModel}
                    renderInput={params => {
                        return (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Модель"
                            fullWidth
                        />
                        );
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Autocomplete
                    disabled={loadingStatusGeneration}
                    id="generation"
                    options={auto.searchParameters ? (auto.searchParameters.generations ? auto.searchParameters.generations : []) : []}
                    getOptionLabel={option => option.generation || option.name}
                    value={checkedGeneration}
                    onChange={handleGeneration}
                    renderInput={params => {
                        return (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Поколение"
                            fullWidth
                        />
                        );
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Год от</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={param}
                            onChange={handleChange}
                            label="Год от"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Год от</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">по</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={param}
                            onChange={handleChange}
                            label="по"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>по</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Тип кузова</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={param}
                            onChange={handleChange}
                            label="Тип кузова"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Тип кузова</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Коробка</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={param}
                            onChange={handleChange}
                            label="Коробка"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Коробка</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </Grid>
            </Grid>
            <Container maxWidth="md" className={classes.ControlBar}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                        >                
                            найти                            
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        >
                            сбросить
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            
            </form>
        </Container>
      </Dialog>
    </div>
  );
}

export default SearchDialog;