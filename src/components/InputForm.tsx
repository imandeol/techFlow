import { useState } from "react";
import { ProjectInput } from "../types";
import { Lightbulb, Layers, Calendar, Clock } from "lucide-react";

const InputForm: React.FC = () => {
  const [input, setInput] = useState<ProjectInput>({
    idea: "",
    features: "",
    techStack: "",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
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
            placeholder="Describe your app idea..."
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
              setInput((prev) => ({ ...prev, features: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="List the main features..."
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
              setInput((prev) => ({ ...prev, techStack: e.target.value }))
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
              setInput((prev) => ({ ...prev, deadline: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        //disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit {/* {isLoading ? "Generating Tasks..." : "Generate Tasks"} */}
      </button>
    </form>
  );
};
export default InputForm;
