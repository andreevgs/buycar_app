import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BlockIcon from '@material-ui/icons/Block';
import {Link, withRouter} from 'react-router-dom';

import SearchDialog from '../../components/SearchDialog/SearchDialog';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(16, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    CardActions: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    CardButton: {
        '&:not(:first-child)': {
            marginLeft: '0',
            marginTop: theme.spacing(1),
        },
    },
    CardButtonIcon: {
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Auto() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                <SearchDialog/>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Peugeot 406
                            </Typography>
                            <Typography className={classes.CarMainInfo}>
                                2002 год, передний привод, синий цвет
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/body.png"/><span>Хэтчбек</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/engine.png"/><span>2.0 / Бензин</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/gear.png"/><span>Механика</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/mileage.png"/><span>210 000 км</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/place.png"/><span>Минск</span>
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.CardActions}>
                            <Button className={classes.CardButton} size="small" color="primary">
                                <FavoriteBorderIcon className={classes.CardButtonIcon} fontSize="small"></FavoriteBorderIcon>
                                В избранное
                            </Button>
                            <Button className={classes.CardButton} size="small" color="primary">
                                <BlockIcon className={classes.CardButtonIcon} fontSize="small"></BlockIcon>
                                Пожаловаться
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
  }
  
  export default withRouter(Auto);