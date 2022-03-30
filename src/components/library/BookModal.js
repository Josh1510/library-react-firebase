import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import _ from 'lodash';
import joinArrayWithComa from './utils/joinArrayWithComa';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '70%',
    maxWidth: '800px',

    '& #modal-details-container': {
      display: 'flex',

      flexWrap: 'wrap',
    },
  },
}));

const BookModal = ({ openState, handleClose, book }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      open={openState}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openState}>
        <div className={classes.paper}>
          <h2 id="modal-title">{_.get(book, ['title'], '')}</h2>
          <div id="modal-details-container">
            <div>
              <div id="modal-author">
                {joinArrayWithComa('Author', _.get(book, ['authors'], ''))}
              </div>
              <div id="modal-rating">
                Rating: {_.get(book, ['averageRating'], '')}
              </div>
              <div id="modal-genre">
                {joinArrayWithComa('Genre', _.get(book, ['categories'], ''))}
              </div>

              <div id="modal-page-count">
                Pages: {_.get(book, ['pageCount'], '')}
              </div>
              <div id="modal-page-read">
                Pages Read:{_.get(book, ['pagesRead'], '')}
              </div>
              <div id="modal-publish-date">
                {_.get(book, ['publishedDate'], '')}
              </div>
              <div id="modal-publisher">{_.get(book, ['publisher'], '')}</div>
            </div>
            {/* Div to put spacing between the learn more and expand description button */}
            <div style={{ flex: '1 0 0' }} />
            <div id="modal-image">
              <img
                src={_.get(book, ['imageLinks', 'thumbnail'], '')}
                alt={`cover for ${_.get(book, ['title'], '')}`}
              />
            </div>

            <hr />
            <div id="modal-description">{_.get(book, ['description'], '')}</div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default BookModal;
