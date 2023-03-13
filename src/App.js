import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      {/* TODO: Change back when page is done being designed */}
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
