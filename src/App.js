import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route element={<HomePage />} />
    </Routes>
  );
}

export default App;
