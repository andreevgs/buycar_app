import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

import ComboBox from '../ComboBox/ComboBox';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  FormContainer: {
      padding: theme.spacing(5, 2, 5, 2),
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [param, setParam] = React.useState('');

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
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
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
            <form className={classes.form} noValidate>
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
                    <ComboBox
                        label="Марка"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ComboBox
                        label="Модель"
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            </form>
        </Container>
      </Dialog>
    </div>
  );
}

export default SearchDialog;