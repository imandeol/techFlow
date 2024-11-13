import InputForm from "./components/InputForm";
import { Brain } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logoLight.svg" className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Tech Flow</h1>
          </div>
          <p className="text-xl text-gray-600">
            Have an app idea? Let's lay down the development plan for you!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-12">
          <InputForm />
        </div>
      </div>
    </div>
  );
}

export default App;
