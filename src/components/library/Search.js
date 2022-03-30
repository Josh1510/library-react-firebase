import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import BookCard from './BookCardSearch';

import BlankBook from './utils/BlankBook';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

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

export default function Search() {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const bookSearch = _.debounce(async (e) => {
    setIsLoading(true);
    setBooks([]);
    let bookToSearch = e.target.value;

    try {
      let response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${bookToSearch}`
      );

      let bookInformation = await response.json();
      setBooks(await bookInformation.items);
    } catch {
      console.log('hmm.. something wrong');
    }
    console.log(books);
    setIsLoading(false);
  }, 250);

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-full-width"
        label="Search"
        style={{ margin: 8 }}
        placeholder="Search"
        helperText="Try typing book name or author!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={(e) => e.target.value.length > 1 && bookSearch(e)}
      />

      {isLoading && <div className={classes.root}>{blankBooks()}</div>}

      {books.map((eachBook) => (
        <BookCard
          key={_.uniqueId()}
          book={_.get(eachBook, ['volumeInfo'], '')}
        />
      ))}
    </div>
  );
}
