import { Route, Routes, useNavigate } from "react-router-dom";
import InputForm from "./components/InputForm";
import TaskBoard from "./components/TaskBoard";
import { useEffect, useState } from "react";
import { setNavigate } from "./redux/navigate";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RESET_TOAST } from "./redux/actions";
import { RootState } from "./redux/reducer";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  const toastValue = useSelector((state: RootState) => state.toastValue);
  const [isToastHandled, setToastHandled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (toastValue && !isToastHandled) {
      if (toastValue.type === "success") {
        toast.success(toastValue.message, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#10B981",
            color: "#FFFFFF",
            padding: "16px",
            borderRadius: "8px",
            fontWeight: "500",
          },
        });
      } else if (toastValue.type === "failure") {
        toast.error(toastValue.message, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#FFFFFF",
            padding: "16px",
            borderRadius: "8px",
            fontWeight: "500",
          },
        });
      }
      setToastHandled(true);
      setTimeout(() => {
        dispatch({ type: RESET_TOAST });
        setToastHandled(false);
      }, 3000);
    }
  }, [toastValue, isToastHandled, dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path={"/"} element={<TaskBoard />} />
        <Route path={"/input-form"} element={<InputForm />} />
        <Route path="*" element={<TaskBoard />} />
      </Routes>
    </>
  );
}

export default App;
