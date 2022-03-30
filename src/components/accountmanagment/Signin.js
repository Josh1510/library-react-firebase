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

export default function Signin() {
  const classes = useStyles();

  const emailRef = useRef();
  const pswrdRef = useRef();

  const { signin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const history = useHistory();

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, pswrdRef.current.value);
      history.push('/');
    } catch {
      setError('Account login failed');
    }
    setLoading(false);
  }

  return (
    <div className="containerDiv">
      <Card className={`${classes.root}, centerMe`}>
        <div className="applyPaddingSides">
          <h2>Sign In</h2>
          {error}
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
            </div>

            <Button
              disabled={loading}
              size="large"
              variant="outlined"
              color="primary"
              type="submit"
            >
              LOG IN
            </Button>
          </form>
          <div className="applyMarginBottom">
            <Link to="/forgot-password">Forgotten password?</Link>
          </div>

          <div className="applyMarginBottom">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
