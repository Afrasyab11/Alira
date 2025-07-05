import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

const ManageLinkedIn = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [disconnectingId, setDisconnectingId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }

      // Fetch from Supabase directly
      const { data, error } = await supabase
        .from("linkedin_accounts")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("is_connected", true);

      if (error) {
        throw new Error("Failed to fetch LinkedIn accounts");
      }

      setAccounts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (accountId) => {
    try {
      setDisconnectingId(accountId);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }

      // Update is_connected to false using Supabase
      const { error } = await supabase
        .from("linkedin_accounts")
        .update({ is_connected: false })
        .eq("id", accountId)
        .eq("user_id", session.user.id);

      if (error) {
        throw new Error("Failed to disconnect LinkedIn account");
      }

      // Remove the account from the list
      setAccounts(accounts.filter((account) => account.id !== accountId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDisconnectingId(null);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const clientId = "86xsystlfuzqie";
      const redirectUri = `${window.location.origin}/linkedin-callback`;
      const scope = "w_member_social";
      const state = Math.random().toString(36).substring(7);
      sessionStorage.setItem("linkedin_auth_state", state);

      // Use the backend endpoint instead of direct LinkedIn OAuth
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

      const response = await fetch(`${backendUrl}/auth/linkedin`);
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        throw new Error("Failed to get LinkedIn auth URL");
      }
    } catch (error) {
      console.error("Error connecting to LinkedIn:", error);
      setError("Failed to connect LinkedIn account");
    } finally {
      setIsConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              to="/integrations"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-2 block"
            >
              &larr; Back to Integrations
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
                <LinkedInIcon />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                  Manage LinkedIn Accounts
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Here are all the LinkedIn accounts you've connected to Alira.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-5 h-48 animate-pulse"
              >
                <div className="h-20 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/integrations"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-2 block"
          >
            &larr; Back to Integrations
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
              <LinkedInIcon />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Manage LinkedIn Accounts
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Here are all the LinkedIn accounts you've connected to Alira.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {accounts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkedInIcon />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              No LinkedIn Accounts Connected
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Connect your LinkedIn account to start publishing articles and
              posts.
            </p>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </div>
              ) : (
                "Connect LinkedIn Account"
              )}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-5 flex flex-col items-center text-center"
              >
                <img
                  src={
                    account.profile_picture_url || "/images/default-avatar.png"
                  }
                  alt={`${account.first_name} ${account.last_name}`}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-zinc-200 dark:border-zinc-700"
                />
                <h3 className="text-md font-bold text-zinc-900 dark:text-white">
                  {account.first_name} {account.last_name}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  {account.headline || "LinkedIn Professional"}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  Connected on{" "}
                  {new Date(account.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleDisconnect(account.id)}
                  disabled={disconnectingId === account.id}
                  className="mt-4 w-full text-center px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {disconnectingId === account.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border border-red-700 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                      Disconnecting...
                    </div>
                  ) : (
                    "Disconnect"
                  )}
                </button>
              </div>
            ))}
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center p-5 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-500 mb-3">
                {isConnecting ? (
                  <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "+"
                )}
              </div>
              <h3 className="text-md font-bold text-zinc-700 dark:text-zinc-300">
                Connect More Accounts
              </h3>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLinkedIn;
