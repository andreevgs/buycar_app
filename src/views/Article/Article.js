import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ArticleMarkdown from '../../components/ArticleMarkdown/ArticleMarkdown';
import { withRouter } from 'react-router-dom';

import { getArticle, clearArticle } from "../../actions/article";
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
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
}));

function Article(props) {
  const classes = useStyles();

  const article = useSelector(state => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticle(props.match.params.id))
      .then(data => {
        console.log('data: ', data);
      })
      .catch(error => {
        console.log('data err: ', error);
      })
    
    return () => {
      dispatch(clearArticle());
    }
  }, []);

  return (
    
    <Container maxWidth="lg" className={classes.container}>
      {article && article.cover &&
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(http://localhost:5000/public/${article.cover})` }}>
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={`http://localhost:5000/public/${article.cover}`} alt={article.title} />}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {article.title}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                    {article.description}
                    </Typography>
                </div>
                </Grid>
            </Grid>
        </Paper>
      }
  
      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={8}>
          {article && 
            <Typography variant="h6" gutterBottom>
              {article.title}
            </Typography>
          }
          <Divider />
          {article && article.content &&
            <ArticleMarkdown className={classes.markdown}>
                {article.content}
            </ArticleMarkdown>
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(Article);