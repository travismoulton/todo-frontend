import {
  Box,
  Checkbox,
  Divider,
  Fade,
  ListItemButton,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material';

import { utils } from './accordianTodoItemsUtils';
import { Todo } from '../AccordianTodos/AccordianTodos';

const { toggleTodoComplete } = utils;

interface IProps {
  todo: Todo;
  updateTodo: (updatedTodo: Todo) => void;
}

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  min-height: 400px;
  background-color: #fff;
  box-shadow: 24;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 2px;
  padding: 0 35px;
`;

export default function AccordianTodoItem({ todo, updateTodo }: IProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function checkboxClickHandler() {
    await toggleTodoComplete(todo._id, !todo.isFinished);
    todo.isFinished = !todo.isFinished;
    updateTodo(todo);
  }

  return (
    <>
      <ListItemButton
        onClick={handleOpen}
        key={todo._id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: '25px',
          '& span': {
            width: '33%',

            '& p': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          },
        }}
      >
        <span>
          <Typography>{todo.title}</Typography>
        </span>
        {todo.category ? (
          <span>
            <Typography>@{todo.category}</Typography>
          </span>
        ) : (
          <span></span>
        )}
        {todo.priority ? (
          <Typography>
            <span>Priority: {todo.priority}</span>
          </Typography>
        ) : (
          <span></span>
        )}
      </ListItemButton>

      <Modal open={open} onClose={handleClose} BackdropProps={{ timeout: 250 }}>
        <Fade in={open}>
          <StyledBox>
            <Typography>{todo.title}</Typography>
            <Divider sx={{ width: '100%', margin: '10px 0' }} />

            <Typography>Description: {todo.content}</Typography>
            <Divider sx={{ width: '100%', margin: '10px 0' }} />

            <Typography sx={{ marginRight: 'auto' }}>Due: {todo.dueDate}</Typography>
            <Divider sx={{ width: '100%', margin: '6px 0' }} />

            {todo.category && (
              <>
                <Typography sx={{ marginRight: 'auto' }}>@{todo.category}</Typography>
                <Divider sx={{ width: '100%', margin: '6px 0' }} />
              </>
            )}

            {todo.priority && (
              <>
                <Typography sx={{ marginRight: 'auto' }}>
                  Priority: {todo.priority}
                </Typography>
                <Divider sx={{ width: '100%', margin: '6px 0' }} />
              </>
            )}

            <Box sx={{ marginRight: 'auto' }}>
              <Typography sx={{ display: 'inline-block' }}>Mark Complete: </Typography>
              <Checkbox checked={todo.isFinished} onChange={checkboxClickHandler} />
            </Box>
          </StyledBox>
        </Fade>
      </Modal>
    </>
  );
}
