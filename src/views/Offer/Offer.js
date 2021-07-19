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
import Paper from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';
import Carousel from 'react-material-ui-carousel'

import { Link, withRouter, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOffer, clearOffer } from "../../actions/offer";

import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(12),
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(16),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingBottom: theme.spacing(20),
          paddingRight: 0,
        },
      },
      carousel: {
          marginTop: theme.spacing(4),
      },
      carouselImage: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '400px'
      }
}));

const post = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};

const sidebar = {
    title: 'About',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };

function Offer(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [markParameter, setMark] = useState('');
    const [modelParameter, setModel] = useState('');
    const [generationParameter, setGeneration] = useState('');

    const offer = useSelector(state => state.offer);

    useEffect(() => {
        dispatch(setOffer([
            props.match.params.mark, props.match.params.model, props.match.params.generation, props.match.params.offer
        ]))
            .then((offerData) => {
                console.log('offer: ', offerData);
            })
            .catch(error => {
                console.log('error occured: ', error);
            })
            .finally(() => {console.log('fin')});
        
        return () => {
            dispatch(clearOffer());
        }
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container}>
                {offer && offer.image &&
                    <main>
                        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(http://localhost:5000/public/${offer.image})` }}>
                            {/* Increase the priority of the hero background image */}
                            {<img style={{ display: 'none' }} src={`http://localhost:5000/public/${offer.image}`} alt={offer.mark + ' ' + offer.model} />}
                            <div className={classes.overlay} />
                            <Grid container>
                                <Grid item md={6}>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {offer.mark + ' ' + offer.model}
                                    </Typography>
                                    <Typography variant="h5" color="inherit" paragraph>
                                    {offer.generation}
                                    </Typography>
                                </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    
                        <Grid container spacing={5} className={classes.mainGrid}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    {offer.mark + ' ' + offer.model + ' ' + offer.generation}
                                </Typography>
                                <Divider />
                                <Carousel
                                    className={classes.carousel}
                                    animation="slide"
                                    timeout={200}
                                    navButtonsAlwaysVisible
                                    autoPlay={false}
                                    fullHeightHover={false}
                                >
                                    {offer && offer.images && offer.images.map((image, number) => {
                                        return (
                                            <Paper className={classes.carouselImage} style={{ backgroundImage: `url(http://localhost:5000/public/${image.name})` }}></Paper>
                                        );
                                    })}
                                </Carousel>
                                {/* {posts.map((post) => (
                                    <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                                        {post}
                                    </Markdown>
                                ))} */}
                            </Grid>
                            <Sidebar
                                offerData={{
                                    year: offer.year,
                                    color: offer.color,
                                    unit: offer.unit,
                                    body: offer.body,
                                    capacity: offer.capacity,
                                    engine: offer.engine,
                                    transmission: offer.transmission,
                                    mileage_km: offer.mileage_km,
                                }}
                            />
                        </Grid>
                    </main>
                }
            </Container>
            <Footer />
        </React.Fragment>
    );
  }
  
export default withRouter(Offer);