import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const FacebookCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Connecting to Facebook...");
  const [error, setError] = useState("");

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const storedState = sessionStorage.getItem("facebook_auth_state");

      if (!code || !state || state !== storedState) {
        setError("Invalid authentication request. Please try again.");
        sessionStorage.removeItem("facebook_auth_state");
        return;
      }

      sessionStorage.removeItem("facebook_auth_state");

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          throw new Error("User not authenticated. Please log in again.");
        }

        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
        const response = await fetch(`${backendUrl}/auth/facebook/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ code, userId: session.user.id }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Successfully connected to Facebook! Redirecting...");
          setTimeout(() => {
            navigate("/integrations?facebook-connected=true");
          }, 2000);
        } else {
          throw new Error(data.message || "Failed to connect to Facebook.");
        }
      } catch (err) {
        setError(err.message);
        setMessage("");
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center font-sans">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        {message && (
          <>
            <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-800 dark:text-zinc-200">{message}</p>
          </>
        )}
        {error && (
          <>
            <p className="text-red-500 font-semibold">{error}</p>
            <button
              onClick={() => navigate("/integrations")}
              className="mt-6 px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Back to Integrations
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FacebookCallback;
