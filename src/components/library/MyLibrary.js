import React, { useState, useEffect } from 'react';
import app from '../../firebase';
import BookCard from './BookCardLibrary';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../contexts/AuthContext';

import BlankBook from './utils/BlankBook';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}));

const blankBooks = () => {
  for (let i = 0; i < 10; i++) {
    return <BlankBook />;
  }
};

export default function MyLibrary() {
  const classes = useStyles();
  const db = app.database();
  const [books, setBooks] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const { currentUser } = useAuth();
  const user = currentUser.uid;

  useEffect(() => {
    const ref = db.ref(`${user}/books/`);

    ref.on('value', (snapshot) => {
      setBooks(snapshotToArray(snapshot));
    });

    return () => ref.off();
  }, []);

  function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    SetIsLoading(false);
    return returnArr;
  }

  const blankBooks = () => {
    return (
      <>
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
        <BlankBook />
      </>
    );
  };

  return (
    <div className={classes.root}>
      {isLoading && <div className={classes.root}>{blankBooks()}</div>}

      {!isLoading &&
        books.map((eachBook) => (
          <BookCard
            key={_.uniqueId()}
            book={_.get(eachBook, ['book'], '')}
            reference={eachBook.key}
          />
        ))}
    </div>
  );
}
