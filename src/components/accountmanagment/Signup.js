import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import { useAuth } from '../../contexts/AuthContext';

import validator from 'validator';

import { Link, useHistory } from 'react-router-dom';

import './stylesAM.css';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function Signup() {
  const classes = useStyles();

  const emailRef = useRef();
  const pswrdRef = useRef();
  const pswrdConfRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const history = useHistory();

  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (pswrdRef.current.value !== pswrdConfRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, pswrdRef.current.value);
      history.push('/');
    } catch {
      setError('Account creation failed');
    }
    setLoading(false);
  }

  return (
    <div className="containerDiv">
      <Card className={`${classes.root}, centerMe`}>
        <div className="applyPaddingSides">
          <h2>Sign Up</h2>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="textFieldContainer, applyMarginBottom">
              <TextField
                inputRef={emailRef}
                id="email-required"
                label="Email"
                required
                onChange={(e) => validateEmail(e)}
                error={emailError.length > 0}
                fullWidth
              />
              <TextField
                inputRef={pswrdRef}
                id="password-required"
                label="Password"
                type="password"
                required
                fullWidth
              />
              <TextField
                inputRef={pswrdConfRef}
                id="password-confirmation"
                label="Password Confirmation"
                type="password"
                error={error.length > 0}
                helperText={error}
                required
                fullWidth
              />
            </div>

            <Button
              disabled={loading}
              size="large"
              variant="outlined"
              color="primary"
              type="submit"
              className="applyMarginBottom"
            >
              SIGN UP
            </Button>
          </form>
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </Card>
    </div>
  );
}
