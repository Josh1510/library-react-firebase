import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import app from '../../firebase';

const useStyles = makeStyles(() => ({
  alert: {
    width: '100%',
  },
  confirmBtn: {
    backgroundColor: 'hsla(210, 68%, 44%, 0.10)',
    '&:hover': {
      backgroundColor: 'hsla(210, 68%, 44%, 0.40)',
    },
  },
  cancelBtn: {
    '&:hover': {
      backgroundColor: 'hsla(210, 68%, 44%, 0.40)',
    },
  },
  dlogActions: {
    justify: 'space-between',
  },
}));

// const bookToDelete = app.database().ref(`${user}/books/${reference}`);

// openState={openDelete}
//             handleClose={handleDeleteClose}
//             title={_.get(book, ['title'], '')}
//             reference={reference}
//             user = {user}

const BookDeleteConfirmation = ({
  openState,
  handleClose,
  title,
  reference,
  user,
}) => {
  const classes = useStyles();

  const bookToDelete = app.database().ref(`${user}/books/${reference}`);

  const deleteBook = () => {
    bookToDelete.remove();
    handleClose();
  };

  return (
    <Dialog
      open={openState}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete ${title} from your library?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Clicking confirm will remove this book from your library, all
          information such as read status and pages read will be removed. This
          can not be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dlogActions}>
        <Button
          onClick={handleClose}
          color="primary"
          className={classes.cancelBtn}
        >
          Cancel
        </Button>
        <Button
          onClick={deleteBook}
          color="primary"
          autoFocus
          className={classes.confirmBtn}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDeleteConfirmation;
