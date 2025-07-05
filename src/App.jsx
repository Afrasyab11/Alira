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
import { Signup } from "./components/auth/signup/Signup";
import Integrations from "./components/pages/integrations/Integrations";
import FacebookCallback from "./components/pages/integrations/FacebookCallback";
import InstagramCallback from "./components/pages/integrations/InstagramCallback";
import LinkedInCallback from "./components/pages/integrations/LinkedInCallback";
import ManageFacebook from "./components/pages/integrations/ManageFacebook";
import ManageInstagram from "./components/pages/integrations/ManageInstagram";
import ManageLinkedIn from "./components/pages/integrations/ManageLinkedIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_ENUM.ROOT} element={<Home />} />
        <Route path={ROUTES_ENUM.LOGIN} element={<AuthLayout />}>
          <Route index element={<Auth />} />
        </Route>
        <Route path={ROUTES_ENUM.SIGNUP} element={<AuthLayout />}>
          <Route index element={<Signup />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route path={ROUTES_ENUM.CHAT} element={<ChatInterface />} />
          <Route path={ROUTES_ENUM.BRAIN} element={<Brain />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route
            path="/integrations/facebook/manage"
            element={<ManageFacebook />}
          />
          <Route
            path="/integrations/instagram/manage"
            element={<ManageInstagram />}
          />
          <Route
            path="/integrations/linkedin/manage"
            element={<ManageLinkedIn />}
          />
        </Route>

        {/* OAuth Callback Routes */}
        <Route path="/facebook-callback" element={<FacebookCallback />} />
        <Route path="/instagram-callback" element={<InstagramCallback />} />
        <Route path="/linkedin-callback" element={<LinkedInCallback />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
