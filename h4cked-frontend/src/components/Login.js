import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';

import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Button,
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState({ username: false, password: false });
  const [isLoggedIn] = useAuthenticated();
  if (isLoggedIn) {
    navigate('/employers');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        AUTH.setToken(data.token);
        navigate('/vacancies');
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message === 'Incorrect password') {
          setError({ ...error, password: true });
        } else {
          setError({ username: true, password: true });
        }
      });
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://64.media.tumblr.com/4da8647196fe810f22a8c0b020ce3622/tumblr_nhsqy93xiU1u79o2lo1_640.gifv)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                type='username'
                label='Username'
                helperText={error.username && 'Incorrect Username'}
                value={formFields.username}
                onChange={handleChange}
                error={error.username}
                name='username'
                autoComplete='username'
                autoFocus
              />

              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={formFields.password}
                onChange={handleChange}
                error={error.password}
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
