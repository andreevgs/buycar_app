import React, { useEffect, useState } from 'react';
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
import Pagination from '@material-ui/lab/Pagination';
import { useLocation } from "react-location";
import { Link, withRouter, Switch, Route, Router, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOffers } from "../../actions/auto";
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

import Footer from '../../components/Footer/Footer';
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

function Auto(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [page, setPage] = useQueryParam('page', NumberParam);
    const [markParameter, setMark] = useState('');
    const [modelParameter, setModel] = useState('');
    const [generationParameter, setGeneration] = useState('');

    const auto = useSelector(state => state.auto);

    const getUrlParams = () => {
        return {
            mark: props.match.params.mark,
            model: props.match.params.model,
            generation: props.match.params.generation
        }
    }

    const handleChangePage = (_, value) => {
        setPage(value);
        window.scrollTo({top: 0});
    };

    useEffect(() => {
        console.log('effect ', getUrlParams());
        if(props.match.params.mark){
            setMark(props.match.params.mark);
            if(props.match.params.model){
                setModel(props.match.params.model);
                if(props.match.params.generation){
                    setGeneration(props.match.params.generation);
                }
            }
        }
        
        console.log('path: ', props.location.pathname);
        dispatch(setOffers((page - 1), [
            props.match.params.mark, props.match.params.model, props.match.params.generation
        ]))
            .then(() => {
                console.log('auto: ', auto);
            })
            .catch(error => {
                console.log('error occured: ', error);
            })
            .finally(() => {console.log('fin')});

    }, [page, props.location.pathname]);

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                <SearchDialog 
                    urlParams={{
                        mark: props.match.params.mark, 
                        model: props.match.params.model, 
                        generation: props.match.params.generation
                    }} 
                    page={page}
                    pathname={props.location.pathname}
                    history={props.history}
                />
                </div>
                <Container className={classes.cardGrid} maxWidth="md">

                {/* End hero unit */}
                <Grid container spacing={4}>
                    {auto && auto.offers && auto.offers.map((offer) => (
                    <Grid item key={offer.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <Link to={'/cars/' + offer.mark.toLowerCase() + '/' + offer.model.toLowerCase() + '/' + offer.generation + '/' + offer.id}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={'http://localhost:5000/public/' + offer.image}
                                title={offer.mark + ' ' + offer.model}
                            />
                        </Link>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {offer.mark + ' ' + offer.model}
                            </Typography>
                            <Typography className={classes.CarMainInfo}>
                                {offer.year} год, {offer.unit} привод, {offer.color.toLowerCase()} цвет
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/body.png"/><span>{offer.body}</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/engine.png"/><span>{offer.capacity} / {offer.engine}</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/gear.png"/><span>{offer.transmission}</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/mileage.png"/><span>{offer.mileage_km} км</span>
                            </Typography>
                            <Typography className={classes.CarInfoString} color="textSecondary">
                                <img className={classes.CarInfoIcon} src="/icons/place.png"/><span>Минск</span>
                            </Typography>
                        </CardContent>
                        {/* <CardActions className={classes.CardActions}>
                            <Button className={classes.CardButton} size="small" color="primary">
                                <FavoriteBorderIcon className={classes.CardButtonIcon} fontSize="small"></FavoriteBorderIcon>
                                В избранное
                            </Button>
                            <Button className={classes.CardButton} size="small" color="primary">
                                <BlockIcon className={classes.CardButtonIcon} fontSize="small"></BlockIcon>
                                Пожаловаться
                            </Button>
                        </CardActions> */}
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
                <Pagination
                    className="my-3"
                    color="primary"
                    count={auto.totalPages}
                    page={auto.currentPage + 1}
                    onChange={handleChangePage}
                />
            </main>
            <Footer />
        </React.Fragment>
    );
  }
  
export default withRouter(Auto);