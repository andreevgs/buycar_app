import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(16, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Новые и подержанные авто
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Удобная продажа автомобилей
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Быстрый поиск предложений
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                <Button variant="contained" color="primary">
                                    подать объявление
                                </Button>
                                </Grid>
                                <Grid item>
                                <Button variant="outlined" color="primary">
                                    искать объявления
                                </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
  }
  
  export default withRouter(Home);