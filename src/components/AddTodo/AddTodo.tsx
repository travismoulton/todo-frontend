import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  createTheme,
  FormControl,
  Input,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useStore } from '../../shared/store/authStore';

export default function AddTodo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useStore();
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);

  const formStyles = { width: '75%', marginBottom: '25px' };

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
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <FormControl sx={{ ...formStyles }}>
          <InputLabel htmlFor="title">Title: </InputLabel>
          <Input
            {...register('title', {
              required: 'Todo must have a title',
            })}
          />
        </FormControl>

        <FormControl sx={{ ...formStyles }}>
          <InputLabel
            htmlFor="description"
            shrink={!!watch('description') || isTextAreaFocused}
            sx={{ top: '-8px' }}
          >
            Description:
          </InputLabel>
          <TextField
            {...register('description')}
            multiline={true}
            minRows={4}
            inputProps={{
              onFocus: () => setIsTextAreaFocused(true),
              onBlur: () => setIsTextAreaFocused(false),
            }}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            onChange={(date) => setDueDate(date)}
            renderInput={(params) => <TextField {...params} sx={{ ...formStyles }} />}
            value={dueDate}
          />
        </LocalizationProvider>
      </form>
    </Box>
  );
}
