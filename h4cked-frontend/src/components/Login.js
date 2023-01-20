import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
// import { useAuthenticated } from '../hooks/useAuthenticated';

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

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({ username: false, password: false });
  // const [isLoggedIn] = useAuthenticated();

  // if (isLoggedIn) {
  //   navigate('/');
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        AUTH.setToken(data.token);
        navigate('/employers');
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message === 'That password seems to be incorrect') {
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
    <Box sx={{ backgroundColor: 'black', flexGrow: 1 }}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/76ffd78e-6fdc-4e52-a221-dd5304e2e982/d7irykc-12c3b2e3-2e50-4e3a-afdb-3745003c4393.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc2ZmZkNzhlLTZmZGMtNGU1Mi1hMjIxLWRkNTMwNGUyZTk4MlwvZDdpcnlrYy0xMmMzYjJlMy0yZTUwLTRlM2EtYWZkYi0zNzQ1MDAzYzQzOTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Lei0BQIfTEGO2KFJopRaBYnmaWx_ApiBUad9UYHIv3U)',
            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light'
            //     ? t.palette.grey[50]
            //     : t.palette.grey[900],
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
            <h1>Log In</h1>
            <Box
              component='text'
              sx={{
                mt: -10,
                mb: 2,
                height: 50,
              }}
            />
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
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
