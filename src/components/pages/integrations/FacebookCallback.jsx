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
      console.log("📘 Facebook Callback: Starting OAuth callback process...");

      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const storedState = sessionStorage.getItem("facebook_auth_state");

      console.log("🔍 Facebook Callback: URL Parameters:", {
        code: code ? `${code.substring(0, 10)}...` : null,
        state: state ? `${state.substring(0, 10)}...` : null,
      });
      console.log(
        "🔐 Facebook Callback: Stored state:",
        storedState ? `${storedState.substring(0, 10)}...` : null
      );

      if (!code || !state || state !== storedState) {
        console.error("❌ Facebook Callback: Invalid authentication request");
        console.error("🔍 Facebook Callback: State validation failed:", {
          hasCode: !!code,
          hasState: !!state,
          stateMatch: state === storedState,
        });
        setError("Invalid authentication request. Please try again.");
        sessionStorage.removeItem("facebook_auth_state");
        return;
      }

      console.log("✅ Facebook Callback: State validation successful");
      sessionStorage.removeItem("facebook_auth_state");
      console.log(
        "🗑️ Facebook Callback: Cleared stored state from sessionStorage"
      );

      try {
        console.log(
          "🔐 Facebook Callback: Getting current Supabase session..."
        );
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error(
            "❌ Facebook Callback: No active session found:",
            sessionError
          );
          throw new Error("User not authenticated. Please log in again.");
        }

        console.log(
          "✅ Facebook Callback: Session found for user:",
          session.user.id
        );

        console.log(
          "🔄 Facebook Callback: Exchanging code for access token..."
        );
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

        console.log("🌐 Facebook Callback: Backend URL:", backendUrl);

        const response = await fetch(`${backendUrl}/auth/facebook/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ code, userId: session.user.id }),
        });

        console.log(
          "📡 Facebook Callback: Backend response status:",
          response.status
        );

        const data = await response.json();
        console.log("📦 Facebook Callback: Backend response data:", data);

        if (response.ok) {
          console.log(
            "🎉 Facebook Callback: Successfully connected Facebook account!"
          );
          console.log("⏰ Facebook Callback: Setting redirect timer...");
          setMessage("Successfully connected to Facebook! Redirecting...");
          setTimeout(() => {
            console.log(
              "🔄 Facebook Callback: Redirecting to integrations page..."
            );
            navigate("/integrations?facebook-connected=true");
          }, 2000);
        } else {
          console.error(
            "❌ Facebook Callback: Failed to connect Facebook account:",
            data.message
          );
          throw new Error(data.message || "Failed to connect to Facebook.");
        }
      } catch (err) {
        console.error("💥 Facebook Callback: Unexpected error:", err);
        console.error("🔍 Facebook Callback: Error details:", {
          message: err.message,
          stack: err.stack,
          name: err.name,
        });
        setError(err.message);
        setMessage("");
      }
    };

    console.log(
      "🚀 Facebook Callback: Component mounted, starting callback process"
    );
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
