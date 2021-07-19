import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { getLocationProps } from 'use-query-params/lib/QueryParamProvider';

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  articleImage: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
    img: {
      component: 
        withStyles(styles)(({ classes, ...props }) => (
          <div className={classes.articleImage}>
            <img {...props} />
          </div>
        )),
    },
  },
};

export default function ArticleMarkdown(props) {
    console.log(props);
  return <ReactMarkdown options={options} {...props} />;
}