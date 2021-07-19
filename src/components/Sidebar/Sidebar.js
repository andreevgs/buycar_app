import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BlockIcon from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        marginBottom: theme.spacing(2),
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
    controlButton: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    controlButtonIcon: {
        marginRight: '6px',
    },
    CarInfoIcon: {
        width: '20px',
        height: '20px',
        marginRight: theme.spacing(1),
    },
    CarMainInfo: {
        marginBottom: theme.spacing(2),
    },
    CarInfoString: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { offerData } = props;
  console.log('of data ', offerData);
  return (
    <Grid item xs={12} md={4}>
    {offerData &&
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography className={classes.CarMainInfo}>
            {offerData.year} год, {offerData.unit} привод, {offerData.color.toLowerCase()} цвет
        </Typography>
        <Typography className={classes.CarInfoString} color="textSecondary">
            <img className={classes.CarInfoIcon} src="/icons/body.png"/><span>{offerData.body}</span>
        </Typography>
        <Typography className={classes.CarInfoString} color="textSecondary">
            <img className={classes.CarInfoIcon} src="/icons/engine.png"/><span>{offerData.capacity} / {offerData.engine}</span>
        </Typography>
        <Typography className={classes.CarInfoString} color="textSecondary">
            <img className={classes.CarInfoIcon} src="/icons/gear.png"/><span>{offerData.transmission}</span>
        </Typography>
        <Typography className={classes.CarInfoString} color="textSecondary">
            <img className={classes.CarInfoIcon} src="/icons/mileage.png"/><span>{offerData.mileage_km} км</span>
        </Typography>
        <Typography className={classes.CarInfoString} color="textSecondary">
            <img className={classes.CarInfoIcon} src="/icons/place.png"/><span>Минск</span>
        </Typography>
      </Paper>
    }
        <Grid container>
            <Grid xs={12}>
                <Button className={classes.controlButton} size="small" color="primary">
                    <FavoriteBorderIcon className={classes.controlButtonIcon} fontSize="small"></FavoriteBorderIcon>
                    В избранное
                </Button>
            </Grid>
            <Grid xs={12}>
                <Button className={classes.controlButton} size="small" color="primary">
                    <BlockIcon className={classes.controlButtonIcon} fontSize="small"></BlockIcon>
                    Пожаловаться
                </Button>
            </Grid>
        </Grid>
        
        
      {/* {archives.map((archive) => (
        <Link display="block" variant="body1" href={archive.url} key={archive.title}>
          {archive.title}
        </Link>
      ))} */}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {/* {social.map((network) => (
        <Link display="block" variant="body1" href="#" key={network}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))} */}
    </Grid>
  );
}

Sidebar.propTypes = {
  offerData: PropTypes.object
};