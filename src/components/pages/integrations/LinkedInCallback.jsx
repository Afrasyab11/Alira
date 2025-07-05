import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    className="text-2xl"
  >
    <path
      fill="#0288D1"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    />
    <path
      fill="#FFF"
      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
    />
  </svg>
);

const LinkedInCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      console.log("🔗 LinkedIn Callback: Starting OAuth callback process...");

      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        console.log("🔍 LinkedIn Callback: URL Parameters:", {
          code: code ? `${code.substring(0, 10)}...` : null,
          state: state ? `${state.substring(0, 10)}...` : null,
        });

        if (!code) {
          console.error(
            "❌ LinkedIn Callback: No authorization code received from LinkedIn"
          );
          setError("No authorization code received from LinkedIn");
          setIsProcessing(false);
          return;
        }

        console.log(
          "✅ LinkedIn Callback: Authorization code received successfully"
        );

        // Get current session
        console.log(
          "🔐 LinkedIn Callback: Getting current Supabase session..."
        );
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          console.error("❌ LinkedIn Callback: No active session found");
          setError("No active session found");
          setIsProcessing(false);
          return;
        }

        console.log(
          "✅ LinkedIn Callback: Session found for user:",
          session.user.id
        );

        // Exchange code for access token via backend
        console.log(
          "🔄 LinkedIn Callback: Exchanging code for access token..."
        );
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

        console.log("🌐 LinkedIn Callback: Backend URL:", backendUrl);

        const response = await fetch(
          `${backendUrl}/api/integrations/linkedin/callback`,
          {
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
          }
        );

        console.log(
          "📡 LinkedIn Callback: Backend response status:",
          response.status
        );

        const data = await response.json();
        console.log("📦 LinkedIn Callback: Backend response data:", data);

        if (response.ok) {
          console.log(
            "🎉 LinkedIn Callback: Successfully connected LinkedIn account!"
          );
          console.log("👤 LinkedIn Callback: Profile data:", data.account);
          setProfileData(data.account);
          setIsProcessing(false);
          setIsSuccess(true);

          // Redirect to LinkedIn manage page after a short delay
          console.log(
            "🔄 LinkedIn Callback: Redirecting to LinkedIn manage page..."
          );
          setTimeout(() => {
            navigate("/integrations/linkedin/manage");
          }, 2000);
        } else {
          console.error(
            "❌ LinkedIn Callback: Failed to connect LinkedIn account:",
            data.message
          );
          setError(data.message || "Failed to connect LinkedIn account");
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("💥 LinkedIn Callback: Unexpected error:", err);
        console.error("🔍 LinkedIn Callback: Error details:", {
          message: err.message,
          stack: err.stack,
          name: err.name,
        });
        setError("An error occurred while connecting your LinkedIn account");
        setIsProcessing(false);
      }
    };

    console.log(
      "🚀 LinkedIn Callback: Component mounted, starting callback process"
    );
    handleCallback();
  }, [searchParams, navigate]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            Connecting LinkedIn Account...
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please wait while we connect your LinkedIn account.
          </p>
        </div>
      </div>
    );
  }

  if (isSuccess && profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div className="p-6 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              LinkedIn Account Connected!
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Your LinkedIn account has been successfully connected to Alira.
            </p>

            {/* Profile Information */}
            <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <LinkedInIcon />
                <h4 className="font-semibold text-zinc-900 dark:text-white">
                  Connected Profile
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={
                    profileData.profile_picture_url ||
                    "/images/default-avatar.png"
                  }
                  alt={`${profileData.first_name} ${profileData.last_name}`}
                  className="w-12 h-12 rounded-full border-2 border-zinc-200 dark:border-zinc-600"
                />
                <div className="text-left">
                  <h5 className="font-semibold text-zinc-900 dark:text-white">
                    {profileData.first_name} {profileData.last_name}
                  </h5>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    LinkedIn Professional
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/integrations/linkedin/manage")}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#0e76a8] hover:bg-[#0e76a8]/90 rounded-lg transition-colors"
              >
                Manage Account
              </button>
              <button
                onClick={() => navigate("/integrations")}
                className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
              >
                Back to Integrations
              </button>
            </div>
          </div>
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

export default LinkedInCallback;
