import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { NavigationItem } from "./NavigationItem";
import { navigateTo } from "../redux/navigate";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions";

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`h-screen bg-blue-600 text-white fixed left-0 top-0 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1
          className={`text-xl font-bold transition-opacity duration-200 ${
            isCollapsed ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          Dashboard
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1">
        <NavigationItem
          icon={LayoutDashboard}
          label="Task Board"
          onClick={() => {
            navigateTo("/dashboard");
          }}
        />
      </div>

      {isCollapsed ? (
        <div className={`p-4 border-t border-gray-800 items-center `}>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <div className={`p-4 border-t border-gray-800`}>
          <button
            onClick={() => {
              handleLogout();
            }}
            className={`flex items-center text-white hover:text-white transition-colors w-full py-2 px-4 rounded-lg hover:bg-gray-800 space-x-2`}
          >
            <LogOut size={20} />
            <span className={`transition-opacity duration-200 block`}>
              Logout
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
