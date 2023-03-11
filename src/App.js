import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
}

export default App;
