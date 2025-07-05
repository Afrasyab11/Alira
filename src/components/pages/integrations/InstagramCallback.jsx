import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const InstagramCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      console.log("📸 Instagram Callback: Starting OAuth callback process...");

      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        console.log("🔍 Instagram Callback: URL Parameters:", {
          code: code ? `${code.substring(0, 10)}...` : null,
          state: state ? `${state.substring(0, 10)}...` : null,
        });

        if (!code) {
          console.error(
            "❌ Instagram Callback: No authorization code received from Instagram"
          );
          setError("No authorization code received from Instagram");
          setIsProcessing(false);
          return;
        }

        console.log(
          "✅ Instagram Callback: Authorization code received successfully"
        );

        // Get current session
        console.log(
          "🔐 Instagram Callback: Getting current Supabase session..."
        );
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          console.error("❌ Instagram Callback: No active session found");
          setError("No active session found");
          setIsProcessing(false);
          return;
        }

        console.log(
          "✅ Instagram Callback: Session found for user:",
          session.user.id
        );

        // Exchange code for access token via backend
        console.log(
          "🔄 Instagram Callback: Exchanging code for access token..."
        );
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

        console.log("🌐 Instagram Callback: Backend URL:", backendUrl);

        const response = await fetch(`${backendUrl}/auth/instagram/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            code,
            state,
            userId: session.user.id,
          }),
        });

        console.log(
          "📡 Instagram Callback: Backend response status:",
          response.status
        );

        const data = await response.json();
        console.log("📦 Instagram Callback: Backend response data:", data);

        if (response.ok) {
          console.log(
            "🎉 Instagram Callback: Successfully connected Instagram account!"
          );
          console.log(
            "🔄 Instagram Callback: Redirecting to integrations page..."
          );
          // Redirect to integrations page with success message
          navigate("/integrations", {
            state: {
              message: "Instagram account connected successfully!",
              type: "success",
            },
          });
        } else {
          console.error(
            "❌ Instagram Callback: Failed to connect Instagram account:",
            data.message
          );
          setError(data.message || "Failed to connect Instagram account");
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("💥 Instagram Callback: Unexpected error:", err);
        console.error("🔍 Instagram Callback: Error details:", {
          message: err.message,
          stack: err.stack,
          name: err.name,
        });
        setError("An error occurred while connecting your Instagram account");
        setIsProcessing(false);
      }
    };

    console.log(
      "🚀 Instagram Callback: Component mounted, starting callback process"
    );
    handleCallback();
  }, [searchParams, navigate]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            Connecting Instagram Account...
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please wait while we connect your Instagram account.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            Connection Failed
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/integrations")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Integrations
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default InstagramCallback;
