import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      {/* TODO: Change back when page is done being designed */}
      <Route index element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
      {/* <Route index element={<HomePage />} /> */}
    </Routes>
  );
}

export default App;
