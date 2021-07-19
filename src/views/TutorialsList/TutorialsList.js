import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../../actions/tutorials";
import { Link, withRouter } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Footer from '../../components/Footer/Footer';
import MainArticlePreview from '../../components/MainArticlePreview/MainArticlePreview';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const TutorialsList = () => {
  const classes = useStyles();

  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector(state => state.tutorials);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTutorials())
      .then(data => {
        console.log('data: ', data);
      })
      .catch(error => {
        console.log('data err: ', error);
      })
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle(searchTitle));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <main>
          {tutorials && tutorials.tutorials &&
            <MainArticlePreview post={tutorials.tutorials[0]} />
          }
          <Grid container spacing={4}>
            {tutorials && tutorials.tutorials && tutorials.tutorials.map((post, index) => {
              if(index !== 0){
                return <ArticlePreview key={post.id} post={post} />
              }
            })}
          </Grid>
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(TutorialsList);