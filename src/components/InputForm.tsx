import { useEffect, useState } from "react";
import { ProjectInput } from "../types";
import { Lightbulb, Layers, Calendar, Clock, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { useNavigate } from "react-router-dom";

const InputForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const inputFormDetails = useSelector(
    (state: RootState) => state.formInputReducer
  );

  const { access_token } = useSelector((state: RootState) => state.auth);
  const [input, setInput] = useState<ProjectInput>(
    inputFormDetails.formInputState
  );

  const toastValue = useSelector((state: RootState) => state.toastValue);

  useEffect(() => {
    if (toastValue?.type === "failure") setIsLoading(false);
  }, [toastValue]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch({ type: "UPDATE_FORM", payload: input });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-12">
          <div
            className={`transition-opacity duration-300 ${
              isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/logoLight.svg" className="w-12 h-12 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">Tech Flow</h1>
              </div>
              <p className="text-xl text-gray-600">
                Have an app idea? Let's lay down the development plan for you!
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-full max-w-2xl"
            >
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
                    <Lightbulb className="w-5 h-5" />
                    Enter your App Idea
                  </label>
                  <textarea
                    required
                    value={input.idea}
                    onChange={(e) =>
                      setInput((prev) => ({ ...prev, idea: e.target.value }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe what you have in mind for your app idea..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
                    <Layers className="w-5 h-5" />
                    Features
                  </label>
                  <textarea
                    required
                    value={input.features}
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        features: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="List the main features you envision your app to perform..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
                    <Calendar className="w-5 h-5" />
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    required
                    value={input.techStack}
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        techStack: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., React, Node.js, MongoDB..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
                    <Clock className="w-5 h-5" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={input.deadline}
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split("T")[0]}
                    onInvalid={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity(
                        "Please select a date that is today or later."
                      );
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity("");
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-2xl">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="text-gray-600 font-medium">
                Generating Tasks for you...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default InputForm;
