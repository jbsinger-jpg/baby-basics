// module imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// relative imports
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ForumMessagePage from "./pages/ForumMessagePage";
import DirectMessagePage from "./pages/DirectMessagePage";
import Context from './context/Context';
import ScreeningPage from "./pages/ScreeningPage";
import MilestonePage from "./pages/MilestonePage";
import MaternalResourcesPage from "./pages/MaternalResourcesPage";
import BabyHealthForumPage from "./pages/BabyHealthForumPage";
import PrenatalForumPage from "./pages/PrenatalForumPage";
import AppointmentForumPage from "./pages/AppointmentForumPage";
import GoodsAndServicesForumPage from "./pages/GoodsAndServicesForumPage";
import BabyPicturePage from "./pages/BabyPicturePage";
import GraphPage from "./pages/GraphPage";

function App() {
  const [state, setState] = useState(null);

  return (
    <Context.Provider value={{ data: state, setData: setState }}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pictures" element={<BabyPicturePage />} />
        <Route path="screening" element={<ScreeningPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="message" element={<DirectMessagePage />} />
        <Route path="forum_Prenatal" element={<PrenatalForumPage />} />
        <Route path="forum_BH" element={<BabyHealthForumPage />} />
        <Route path="forum_AAS" element={<AppointmentForumPage />} />
        <Route path="forum_GSA" element={<GoodsAndServicesForumPage />} />
        <Route path="message-page" element={<ForumMessagePage />} />
        <Route path="milestone" element={<MilestonePage />} />
        <Route path="maternal" element={<MaternalResourcesPage />} />
        <Route path="graph" element={<GraphPage />} />
      </Routes>
    </Context.Provider>

  );
}

export default App;
