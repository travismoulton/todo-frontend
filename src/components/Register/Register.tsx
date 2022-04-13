import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { utils } from './registerUtils';
import { useStore } from '../../shared/store/authStore';
import { useEffect } from 'react';

const { registerUser } = utils;

export default function Register() {
  const { register, watch } = useForm();
  const navigate = useNavigate();
  const { setUser, user } = useStore();

  const formStyles = {
    width: '75%',
    marginBottom: '20px',
  };

  async function submitHandler() {
    const { data } = await registerUser(watch('name'), watch('password'));
    const { user } = data;

    // Strip unneeeded properties from the user before putting into the store
    ['__v', '_id', 'password'].forEach((prop) => delete user[prop]);

    setUser(user);
  }

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
      <FormControl sx={{ ...formStyles }}>
        <InputLabel htmlFor="confirm">Confirm Password: </InputLabel>
        <Input {...register('confirm')} id="confirm" type="password" />
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          width: '50%',
        }}
        onClick={submitHandler}
      >
        Register
      </Button>
    </Box>
  );
}
