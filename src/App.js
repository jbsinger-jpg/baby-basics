import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ForumMessagePage from "./pages/ForumMessagePage";
import DirectMessagePage from "./pages/DirectMessagePage";
import Context from './context/Context';
import PurchasePage from "./pages/PurchasePage";
import StarterForumTopicPage from "./pages/StarterForumTopicPage";
import ScreeningPage from "./pages/ScreeningPage";


function App() {
  const [state, setState] = useState(null);

  return (
    <Context.Provider value={{ data: state, setData: setState }}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="screening" element={<ScreeningPage />} />
        <Route path="store" element={<HomePage />} />
        <Route path="purchase" element={<PurchasePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="message" element={<DirectMessagePage />} />
        <Route path="forum" element={<StarterForumTopicPage />} />
        <Route path="message-page" element={<ForumMessagePage />} />
      </Routes>
    </Context.Provider>

  );
}

export default App;
