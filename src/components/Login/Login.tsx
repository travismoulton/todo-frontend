import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import FormInputError from '../FormInputError/FormInputError';
import { utils, UserData, ErrorData } from './loginUtils';
import { useStore } from '../../shared/store/authStore';

const { loginUser } = utils;

export default function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser, user } = useStore();

  const [err, setErr] = useState({ isError: false, msg: '' });

  function handleFailedLogin(errData: ErrorData) {
    const { data } = errData;
    setErr({ isError: true, msg: data.message });
  }

  function handleSuccessfulLogin(userData: UserData) {
    const {
      data: { user },
    } = userData;

    // Strip unneeeded properties from the user before putting into the store
    ['__v', '_id', 'password'].forEach(
      (prop) => delete user[prop as keyof UserData['data']['user']]
    );

    setUser(user);
  }

  async function submitHandler() {
    const [username, password] = [watch('name'), watch('password')];
    const data = await loginUser(username, password);

    if (data.status === 'fail') handleFailedLogin(data);
    if (data.status === 'success') handleSuccessfulLogin(data);
  }

  // After the user logs in, there will be a user in the store. Redirect to the homepage
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const formStyles = { width: '75%', marginBottom: '20px' };

  return (
    <Box
      sx={{
        width: 500,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {err.isError && (
        <Typography
          variant="h6"
          component="h6"
          marginBottom="25px"
          sx={{ color: '#ff4d4d' }}
        >
          {err.msg}
        </Typography>
      )}
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <FormInputError errors={errors} input="name" />

        <FormControl sx={{ ...formStyles }}>
          <InputLabel htmlFor="name">Your name: </InputLabel>
          <Input
            {...register('name', {
              required: 'Username is required',
            })}
            id="name"
          />
        </FormControl>

        <FormInputError errors={errors} input="password" />

        <FormControl sx={{ ...formStyles }}>
          <InputLabel htmlFor="password">Your password: </InputLabel>
          <Input
            {...register('password', {
              required: 'Password is required',
            })}
            id="password"
            type="password"
          />
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: '50%',
            marginBottom: '10px',
          }}
          type="submit"
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" component="p">
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Box>
  );
}
