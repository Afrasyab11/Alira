import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { supabase } from "../../../lib/supabase";

const ManageFacebook = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log(session);

        if (sessionError || !session) {
          throw new Error("User not authenticated. Please log in again.");
        }

        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

        const response = await fetch(
          `${backendUrl}/api/integrations/facebook/pages/${session.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch connected pages.");
        }

        const data = await response.json();
        setPages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

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
            <div className="w-12 h-12 bg-blue rounded-full flex items-center justify-center">
              <FaFacebook className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Manage Facebook Pages
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Here are all the Facebook pages you've connected to Alira.
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <p className="text-zinc-500 dark:text-zinc-400">Loading pages...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div
                key={page.page_id}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-5 flex flex-col items-center text-center"
              >
                <img
                  src={page.picture_url}
                  alt={page.name}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-zinc-200 dark:border-zinc-700"
                />
                <h3 className="text-md font-bold text-zinc-900 dark:text-white">
                  {page.name}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  ID: {page.page_id}
                </p>

                <button className="mt-4 w-full text-center px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                  Disconnect
                </button>
              </div>
            ))}
            <Link
              to="/integrations"
              className="bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center p-5 hover:border-blue hover:text-blue transition-colors"
            >
              <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-500 mb-3">
                +
              </div>
              <h3 className="text-md font-bold text-zinc-700 dark:text-zinc-300">
                Connect More Pages
              </h3>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFacebook;
