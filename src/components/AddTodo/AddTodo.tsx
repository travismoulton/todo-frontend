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
import FormInputError from '../FormInputError/FormInputError';
import { utils } from './addTodoUtils';
import { utils as globalUtils } from '../../shared/utils';

const { addTodo } = utils;
const { generateDateStr } = globalUtils;

export interface ITodo {
  title: string;
  content: string;
  dueDateStr: number | null;
  dueDate: Date;
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

  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [dueDateStr, setDueDateStr] = useState<number>(generateDateStr(new Date()));
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  async function submitHandler() {
    const todoData: ITodo = {
      title: watch('title'),
      content: watch('description'),
      dueDate,
      dueDateStr,
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
        <FormInputError input="title" errors={errors} />
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

        <CustomDatePicker setDateStr={setDueDateStr} setDate={setDueDate} />

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
