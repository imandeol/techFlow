import { Route, Routes, useNavigate } from "react-router-dom";
import InputForm from "./components/InputForm";
import TaskBoard from "./components/TaskBoard";
import { useEffect } from "react";
import { setNavigate } from "./redux/navigate";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path={"/"} element={<TaskBoard />} />
      <Route path={"/input-form"} element={<InputForm />} />
      <Route path="*" element={<TaskBoard />} />
    </Routes>
  );
}

export default App;
