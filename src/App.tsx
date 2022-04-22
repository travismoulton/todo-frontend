import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AddTodo from './components/AddTodo/AddTodo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: '#e3abed',
          },
          '&[aria-selected="true"].Mui-focused': {
            backgroundColor: '#e3abed',
          },

          '&.Mui-focused': {
            backgroundColor: '#9c27b0',
          },
          // backgroundColor: '#fff',
        },
        inputRoot: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9c27b0',
          },

          '&:Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9c27b0',
          },

          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9c27b0',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: 'green',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '7rem' }} className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
