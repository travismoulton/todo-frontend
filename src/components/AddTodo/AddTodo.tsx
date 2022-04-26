import { useForm } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

import { utils } from './addTodoUtils';

const { addTodo } = utils;

export interface ITodo {
  title: string;
  content: string;
  dueDate: Date | null;
  category: string | null;
  priority: string | null;
}

export default function AddTodo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  async function submitHandler() {
    const todoData: ITodo = {
      title: watch('title'),
      content: watch('description'),
      dueDate,
      category,
      priority,
    };

    await addTodo(todoData);

    navigate('/');
  }

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
        onSubmit={handleSubmit(submitHandler)}
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

        <CustomDatePicker setDate={setDueDate} />

        <FormControl sx={{ ...formStyles }}>
          <Autocomplete
            options={['Work', 'School', 'Chore', 'Family']}
            renderInput={(params) => <TextField {...params} label="Category" />}
            onChange={(_e, val) => setCategory(val as string)}
          />
        </FormControl>

        <FormControl sx={{ ...formStyles }}>
          <Autocomplete
            options={['1', '2', '3']}
            renderInput={(params) => <TextField {...params} label="Priority" />}
            onChange={(_e, val) => setPriority(val)}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '50%',
            marginBottom: '10px',
          }}
          type="submit"
        >
          Add Todo
        </Button>
      </form>
    </Box>
  );
}
