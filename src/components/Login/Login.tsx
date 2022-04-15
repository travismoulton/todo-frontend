import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import { utils } from './loginUtils';
import { useStore } from '../../shared/store/authStore';

const { loginUser } = utils;

export default function Login() {
  const { register, watch } = useForm();
  const navigate = useNavigate();
  const { setUser, user } = useStore();

  const formStyles = {
    width: '75%',
    marginBottom: '20px',
  };

  async function submitHandler() {
    const [username, password] = [watch('name'), watch('password')];
    const { data } = await loginUser(username, password);
    const { user } = data;

    // Strip unneeeded properties from the user before putting into the store
    ['__v', '_id', 'password'].forEach((prop) => delete user[prop]);

    setUser(user);
  }

  // After the user logs in, there will be a user in the store. Redirect to the homepage
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

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
      <FormControl sx={{ ...formStyles }}>
        <InputLabel htmlFor="name">Your name: </InputLabel>
        <Input {...register('name')} id="name" />
      </FormControl>
      <FormControl sx={{ ...formStyles }}>
        <InputLabel htmlFor="password">Your password: </InputLabel>
        <Input {...register('password')} id="password" type="password" />
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          width: '50%',
          marginBottom: '10px',
        }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Typography variant="body2" component="p">
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Box>
  );
}
