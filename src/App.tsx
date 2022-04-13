import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar/Navbar';
import Register from './components/Register/Register';

function App() {
  return (
    <div style={{ padding: '7rem' }} className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
