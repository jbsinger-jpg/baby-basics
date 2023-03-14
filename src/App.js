import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MessagePage from "./pages/MessagePage";
import Context from './context/Context';


function App() {
  const [state, setState] = useState(null);

  return (
    <Context.Provider value={{ data: state, setData: setState }}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="message" element={<MessagePage />} />
      </Routes>
    </Context.Provider>

  );
}

export default App;
