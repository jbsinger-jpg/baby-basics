import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ForumPage from "./pages/ForumPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forum" element={<ForumPage />} />
    </Routes>
  );
}

export default App;
