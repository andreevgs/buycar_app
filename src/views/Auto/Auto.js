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

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
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
    }
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
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Album layout
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                    <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="contained" color="primary">
                            Main call to action
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="outlined" color="primary">
                            Secondary action
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
                </Container>
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
                            <Typography>
                                This is a media card. You can use this section to describe the content.
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