import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { Icons } from "../../../assets/Icons";
import { Image } from "../../../common/image/Image";
import Typography from "../../../common/Typography";
import InputField from "../../../common/Inputs/Inputs";
import Button from "../../../common/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Successful login
      navigate("/chat"); // Redirect to chat page after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light flex justify-center items-center min-h-screen">
      <div className="bg-white sm:w-full md:min-w-[423px] max-w-lg flex flex-col space-y-5 py-10 sm:px-10 md:px-14 rounded-xl">
        <div className="flex justify-center items-center w-full">
          <Image src={Icons?.alira} alt="logo" className="h-auto w-auto" />
        </div>
        <div className="w-full text-center">
          <Typography variant="p">Sign in to continue</Typography>
        </div>
        <div className="flex gap-x-3 justify-center">
          <Image
            src={Icons?.google}
            alt="google"
            className="h-auto w-auto cursor-pointer"
          />
          <Image
            src={Icons?.apple}
            alt="apple"
            className="h-auto w-auto cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center gap-x-3 text-[#A0A0A0]">
          <span className="border-t-[2px] border-[#A0A0A0] w-16"></span>
          <Typography variant="p">or sign in with</Typography>
          <span className="border-t-[2px] border-[#A0A0A0] w-16"></span>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-y-7">
          <InputField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="flex flex-col">
            <div className="mt-5 w-full">
              <Button
                label={loading ? "Signing in..." : "Sign in"}
                type="submit"
                disabled={loading}
                className="w-full bg-blue"
              />
            </div>
            <div className="flex justify-center gap-x-2 mt-5">
              <p className="text-[#A0A0A0]">Don't have an account?</p>
              <Link to="/signup" className="text-[#454545]">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
