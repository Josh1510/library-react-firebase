import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './skeleton.css';

const useStyles = makeStyles(() => ({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
}));

const BlankBook = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className="skeleton-margin">
        <CardHeader className="skeleton skeleton-text" />
        <CardHeader className="skeleton skeleton-text" />
      </div>
      <CardActionArea>
        <CardMedia
          className={`${classes.media} skeleton`}
          image="./../../images/holdingImg.jpg"
          title="loading"
        />

        <CardContent>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className="skeleton skeleton-text"></Button>

        <Button className="skeleton skeleton-text"></Button>

        {/* Div to put spacing between the learn more and expand description button */}

        <div>
          <div style={{ flex: '1 0 0' }} />
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default BlankBook;
