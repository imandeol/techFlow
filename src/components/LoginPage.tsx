import { LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { AuthActionTypes, loginRequest } from "../redux/actions";
import { useEffect } from "react";
import { navigateTo } from "../redux/navigate";
import { Dispatch } from "@reduxjs/toolkit";

export function LoginPage() {
  const dispatch: Dispatch<AuthActionTypes> = useDispatch();
  const { access_token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (access_token) {
      navigateTo("/dashboard");
    }
  }, []);

  const handleAuth = () => {
    dispatch(loginRequest());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      
      
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
      <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="mt-2 text-sm text-gray-600">
            Disclaimer:
          </p>
          <ul className="text-xs text-gray-600 list-disc list-inside">
            <li>You would need to login on Linear first, and then comeback to authorize your account on Tech Flow. <b>Doing this because linear provides authorize token and no login exposure</b></li>
            <li>On logout, please follow the same steps mentioned above to sign in again, since app logout also triggers logout from linear.app.</li>
          </ul>
        </div>

        
        <div className="flex items-center justify-center mb-2">
          <LogIn className="w-10 h-10 text-blue-600" />
        </div>

        
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Welcome to TechFlow
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your Linear account to continue
        </p>


        <div className="space-y-4 mb-4">
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            onClick={() => {
              window.open("https://linear.app/login", "_blank");
            }}
          >
            Step 1: Login with Linear
          </button>
        </div>


        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => {
              handleAuth();
            }}
          >
            <LogIn className="w-5 h-5 mr-2" />
            Step 2: Authorize Linear on Tech Flow
          </button>
        </div>

       
       
      </div>
    </div>
  );
}
