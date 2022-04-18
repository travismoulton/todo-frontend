import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AddTodo from './components/AddTodo/AddTodo';

function App() {
  return (
    <div style={{ padding: '7rem' }} className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
