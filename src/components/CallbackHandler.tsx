import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthActionTypes, handleCallback } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

const CallbackHandler: React.FC = () => {
  const dispatch: Dispatch<AuthActionTypes> = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      dispatch(handleCallback(code));
    }
  }, [location, dispatch]);

  return <div>Give us a moment to Log you in...</div>;
};

export default CallbackHandler;
