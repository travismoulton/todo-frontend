import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { utils, UserData } from './appUtils';
import { useStore } from './shared/store/authStore';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import AddTodo from './components/AddTodo/AddTodo';
import EditTodo from './components/EditTodo/EditTodo';
import theme from './shared/theme';

const { checkForUser } = utils;

function App() {
  const { setUser, user } = useStore();

  useEffect(() => {
    (async () => {
      const data = await checkForUser();

      if (data.status === 'success') {
        const { user } = data.data;
        // Strip unneeeded properties from the user before putting into the store
        ['__v', '_id', 'password'].forEach(
          (prop) => delete user[prop as keyof UserData['data']['user']]
        );

        setUser(user);
      }
    })();
  }, [setUser]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '7rem' }} className="App">
        <Navbar isAuth={!!user} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/edit-todo/:id" element={<EditTodo />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
