import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AuthFormInputError from '../AuthFormInputError/AuthFormInputError';
import { utils, UserData, ErrorData } from './registerUtils';
import { useStore } from '../../shared/store/authStore';

const { registerUser } = utils;

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUser, user } = useStore();
  const [err, setErr] = useState({ isError: false, msg: '' });

  // After the user registers, there will be a user in the store. Redirect to the homepage
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  function handleFailedRegister(errData: ErrorData) {
    const { data } = errData;
    setErr({ isError: true, msg: data.message });
  }

  function handleSuccessfulRegister(userData: UserData) {
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
    const [username, password]: [string, string] = [watch('name'), watch('password')];

    const data = await registerUser(username, password);

    if (data.status === 'fail') handleFailedRegister(data);
    if (data.status === 'success') handleSuccessfulRegister(data);
  }

  function confirmPasswordsMatch() {
    const [password, confirmPassowrd]: string[] = [watch('password'), watch('confirm')];

    return password === confirmPassowrd;
  }

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
        <AuthFormInputError input="name" errors={errors} />

        <FormControl sx={{ ...formStyles }}>
          <InputLabel htmlFor="name">Your name: </InputLabel>
          <Input
            {...register('name', {
              required: 'A username is required',
            })}
            id="name"
          />
        </FormControl>

        <AuthFormInputError input="password" errors={errors} />

        <FormControl sx={{ ...formStyles }}>
          <InputLabel htmlFor="password">Your password: </InputLabel>
          <Input
            {...register('password', {
              required: 'A password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            id="password"
            type="password"
            autoComplete="false"
          />
        </FormControl>

        <AuthFormInputError input="confirm" errors={errors} />

        <FormControl sx={{ ...formStyles }}>
          <InputLabel htmlFor="confirm">Confirm Password: </InputLabel>
          <Input
            {...register('confirm', {
              validate: {
                confirmPasswordsMatch: () =>
                  confirmPasswordsMatch() || 'Passwords dont match',
              },
            })}
            id="confirm"
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
          Register
        </Button>
      </form>
      <Typography variant="body2" component="p">
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </Box>
  );
}
