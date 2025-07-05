import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    className="text-2xl"
  >
    <radialGradient
      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
      cx="19.38"
      cy="42.035"
      r="44.899"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#fd5" />
      <stop offset=".328" stopColor="#ff543f" />
      <stop offset=".348" stopColor="#fc5245" />
      <stop offset=".504" stopColor="#e64771" />
      <stop offset=".643" stopColor="#d53e91" />
      <stop offset=".761" stopColor="#cc39a4" />
      <stop offset=".841" stopColor="#c837ab" />
    </radialGradient>
    <path
      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
    />
    <radialGradient
      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
      cx="11.786"
      cy="5.54"
      r="29.813"
      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#4168c9" />
      <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
    </radialGradient>
    <path
      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
    />
    <path
      fill="#fff"
      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
    />
    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
    <path
      fill="#fff"
      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
    />
  </svg>
);

const ManageInstagram = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        .from("instagram_accounts")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("is_connected", true);

      if (error) {
        throw new Error("Failed to fetch Instagram accounts");
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }

      // Update is_connected to false using Supabase
      const { error } = await supabase
        .from("instagram_accounts")
        .update({ is_connected: false })
        .eq("id", accountId)
        .eq("user_id", session.user.id);

      if (error) {
        throw new Error("Failed to disconnect Instagram account");
      }

      // Remove the account from the list
      setAccounts(accounts.filter((account) => account.id !== accountId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const appId = "1243765633792492";
      const redirectUri = `${window.location.origin}/instagram-callback`;
      const scope = "instagram_basic,instagram_content_publish";
      const state = Math.random().toString(36).substring(7);
      sessionStorage.setItem("instagram_auth_state", state);

      const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1243765633792492&redirect_uri=https://localhost:3000/instagram-callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
      window.location.href = instagramAuthUrl;
    } catch (error) {
      console.error("Error connecting to Instagram:", error);
      setError("Failed to connect Instagram account");
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center">
                <InstagramIcon />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                  Manage Instagram Accounts
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Here are all the Instagram accounts you've connected to Alira.
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center">
              <InstagramIcon />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Manage Instagram Accounts
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Here are all the Instagram accounts you've connected to Alira.
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <InstagramIcon />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              No Instagram Accounts Connected
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Connect your Instagram account to start scheduling posts.
            </p>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-6 py-2 bg-gradient-to-r from-[#0071E3] via-[#d62976] via-[#962fbf] to-[#fa7e1e] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </div>
              ) : (
                "Connect Instagram Account"
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
                  src={account.profile_picture_url}
                  alt={account.username}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-zinc-200 dark:border-zinc-700"
                />
                <h3 className="text-md font-bold text-zinc-900 dark:text-white">
                  {account.username}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  {account.name}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  Connected on{" "}
                  {new Date(account.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleDisconnect(account.id)}
                  className="mt-4 w-full text-center px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ))}
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center p-5 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ManageInstagram;
