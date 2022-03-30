import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import app from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import _ from 'lodash';
import BookModal from './BookModal';
import joinArrayWithComa from './utils/joinArrayWithComa';

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
  descriptionShort: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },
  alert: {
    width: '100%',
  },
  loadingImg: {
    zIndex: '-1',
  },
});

const BookCard = ({ book, reference }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const user = currentUser.uid;

  const [expanded, setExpanded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [openModal, setModalOpen] = useState(false);

  const db = app.database();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToDatabaseClick = async (book) => {
    const bookRef = db.ref(`${user}/books`).push();
    book.read = false;
    book.pagesRead = 0;
    bookRef.set({ book });
    setDisabled(true);
  };

  const handleRemoveFromDatabaseClick = () => {
    let toremove = db.ref(`${user}/books/${reference}`);
    toremove
      .remove()
      .then(function () {
        console.log('Remove succeeded.');
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Card className={classes.root} key={_.get(book, ['id'], '')}>
      <CardHeader
        title={_.get(book, ['title'], '')}
        subheader={joinArrayWithComa('', _.get(book, ['authors'], ''))}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={_.get(book, ['imageLinks', 'thumbnail'], '')}
          title={`Cover Art for ${_.get(book, ['title'], '')}`}
        />

        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={!expanded && classes.descriptionShort}
          >
            {_.get(book, ['description'], '')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleAddToDatabaseClick(book)}
          disabled={disabled}
        >
          Add to Library
        </Button>
        {/* Open the book information modal when button clicked */}
        <Button onClick={handleModalOpen} size="small" color="primary">
          Learn More
        </Button>

        {openModal && (
          <BookModal
            openState={openModal}
            handleClose={handleModalClose}
            book={book}
          />
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <CardActions>
        {disabled && (
          <Alert
            className={classes.alert}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => handleRemoveFromDatabaseClick()}
              >
                UNDO
              </Button>
            }
          >
            Book saved!
          </Alert>
        )}
      </CardActions>
    </Card>
  );
};
export default BookCard;
