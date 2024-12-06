import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthActionTypes, handleCallback } from "../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

const CallbackHandler: React.FC = () => {
  const dispatch: Dispatch<AuthActionTypes> = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      dispatch(handleCallback(code));
    } else navigate("/login");
  }, [location, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <svg
          className="animate-spin h-12 w-12 text-blue-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <h1 className="mt-6 text-xl font-semibold text-gray-800">
          Getting you into TechFlow...
        </h1>
        <p className="mt-2 text-gray-600">
          Please wait a moment while we process your Linear Authorization.
        </p>
      </div>
    </div>
  );
};

export default CallbackHandler;
