import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";

const Integrations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [connectedPlatforms, setConnectedPlatforms] = useState({
    facebook: false,
    instagram: false,
    linkedin: false,
  });

  const [isConnecting, setIsConnecting] = useState({
    facebook: false,
    instagram: false,
    linkedin: false,
  });

  useEffect(() => {
    if (searchParams.get("facebook-connected") === "true") {
      setConnectedPlatforms((prev) => ({ ...prev, facebook: true }));
      // Clean up the URL
      searchParams.delete("facebook-connected");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const platforms = [
    {
      id: "facebook",
      name: "Facebook",
      icon: <FaFacebook />,
      description: "Connect your Facebook account to manage your pages.",
      color: "bg-blue",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <FaInstagram />,
      description: "Connect your Instagram account to publish posts.",
      color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <FaLinkedin />,
      description: "Connect your LinkedIn account to publish articles.",
      color: "bg-sky-600",
    },
  ];

  const handleConnect = async (platformId) => {
    if (platformId === "facebook") {
      const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
      const redirectUri = `${window.location.origin}/facebook-callback`;
      const scope = "public_profile,pages_show_list,pages_manage_posts";
      const state = Math.random().toString(36).substring(7);
      sessionStorage.setItem("facebook_auth_state", state);

      const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
      window.location.href = facebookAuthUrl;
      return;
    }

    // Simulation for other platforms
    setIsConnecting((prev) => ({ ...prev, [platformId]: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = Math.random() > 0.3;
      if (success) {
        setConnectedPlatforms((prev) => ({ ...prev, [platformId]: true }));
      }
    } catch (error) {
      console.error(`Error connecting to ${platformId}:`, error);
    } finally {
      setIsConnecting((prev) => ({ ...prev, [platformId]: false }));
    }
  };

  const handleDisconnect = async (platformId) => {
    // For demo, we are not implementing a loading state here
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConnectedPlatforms((prev) => ({ ...prev, [platformId]: false }));
    } catch (error) {
      console.error(`Error disconnecting from ${platformId}:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Integrations
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Connect your social media accounts to schedule and publish posts
            directly from Alira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col p-6"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div
                    className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center`}
                  >
                    {React.cloneElement(platform.icon, {
                      className: "text-2xl text-white",
                    })}
                  </div>
                  {connectedPlatforms[platform.id] && (
                    <div className="flex items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 px-3 py-1.5 rounded-lg font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Connected
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {platform.name}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 h-10">
                    {platform.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                {connectedPlatforms[platform.id] ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDisconnect(platform.id)}
                      className="w-full text-center px-4 py-2.5 bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                    >
                      Disconnect
                    </button>
                    <Link
                      to={`/integrations/${platform.id}/manage`}
                      className="w-full text-center px-4 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      Manage
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => handleConnect(platform.id)}
                    disabled={isConnecting[platform.id]}
                    className="w-full text-center px-4 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed"
                  >
                    {isConnecting[platform.id] ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      "Connect"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
