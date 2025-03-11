import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { ROUTES_ENUM } from "./constants/routes.constant";
import AuthLayout from "./layouts/AuthLayout";
import NoPage from "./components/pages/404";
import AppLayout from "./layouts/AppLayout";
import { Login } from "./components/auth/login/Login";
// import { useAuth } from "./sessionManager/SessionContext"; 
import ChatInterface from "./components/pages/chat/Chat";
import Brain from "./components/pages/brain/SmallScreenBrain";
import Home from "./components/pages/landingPage";
import { Auth } from "./components/auth/Index";
function App() {
  // const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page - Redirect to Login if not authenticated */}
        <Route path={ROUTES_ENUM.ROOT} element={<Home />} />

        {/* Login Route */}
        <Route path={ROUTES_ENUM.LOGIN} element={<AuthLayout />}>
          <Route index element={<Auth />} />
        </Route>

        {/* Protected Routes - Only accessible if logged in */}
        <Route path="/" element={<AppLayout />}>
          <Route path={ROUTES_ENUM.CHAT} element={<ChatInterface />} />
          <Route path={ROUTES_ENUM.BRAIN} element={<Brain />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
