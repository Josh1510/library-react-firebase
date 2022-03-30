import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAuth } from '../../contexts/AuthContext';
import _ from 'lodash';

import BookModal from './BookModal';
import DeleteConfimation from './BookDeleteConfirmation';

import joinArrayWithComa from './utils/joinArrayWithComa';

import './styles.css';

const useStyles = makeStyles(() => ({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
  descriptionShort: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
  },
  shortenTitle: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
}));

const BookCard = ({ book, reference }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const user = currentUser.uid;

  const [expanded, setExpanded] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openModal, setModalOpen] = useState(false);

  const handleExpandClick = (e) => {
    setExpanded(!expanded);
  };

  const handleDeleteOpen = () => {
    console.log(book);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
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
        {_.get(book, ['imageLinks', 'thumbnail'], '') ? (
          <CardMedia
            className={classes.media}
            image={_.get(book, ['imageLinks', 'thumbnail'], '')}
            title={`Cover Art for ${_.get(book, ['title'], '')}`}
          />
        ) : (
          <div>image loading..</div>
        )}

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
        <Button size="small" color="primary" onClick={handleDeleteOpen}>
          delete
        </Button>

        {/* Open the delete confirmation if user clicks delete */}
        {openDelete && (
          <DeleteConfimation
            openState={openDelete}
            handleClose={handleDeleteClose}
            title={_.get(book, ['title'], '')}
            reference={reference}
            user={user}
          />
        )}

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

        {/* Div to put spacing between the learn more and expand description button */}

        <div>
          <div style={{ flex: '1 0 0' }} />
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
        </div>
      </CardActions>
    </Card>
  );
};

export default BookCard;
