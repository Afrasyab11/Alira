import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { ROUTES_ENUM } from "./constants/routes.constant";
import AuthLayout from "./layouts/AuthLayout";
import NoPage from "./components/pages/404";
import AppLayout from "./layouts/AppLayout";
import ChatInterface from "./components/pages/chat/Chat";
import Brain from "./components/pages/brain/main";
import Home from "./components/pages/landingPage";
import { Auth } from "./components/auth/Index";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_ENUM.ROOT} element={<Home />} />
        <Route path={ROUTES_ENUM.LOGIN} element={<AuthLayout />}>
          <Route index element={<Auth />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path={ROUTES_ENUM.CHAT} element={<ChatInterface />} />
          <Route path={ROUTES_ENUM.BRAIN} element={<Brain />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
