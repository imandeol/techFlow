import React, { useEffect, useState } from "react";
import { FETCH_DATA_FROM_LINEAR, loginSuccess } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { LayoutGrid, Loader, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { navigateTo } from "../redux/navigate";
import { Task } from "../types";
import { redirect } from "react-router-dom";

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();

  const issues: Task[] | undefined = useSelector(
    (state: RootState) => state.tasks.issues
  );

  const { access_token } = useSelector((state: RootState) => state.auth);
  const fetchLinearTeamTasks = () => {
    dispatch({ type: FETCH_DATA_FROM_LINEAR });
  };

  const navigateToInputForm = () => {
    navigateTo("/input-form");
  };

  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!access_token) {
      navigateTo("/login");
    } else {
      fetchLinearTeamTasks();
    }
  }, [navigateTo]);

  useEffect(() => {
    if (issues && issues.length >= 0) {
      setLoading(false);
      setTotalPages(issues.length > 0 ? Math.ceil(issues.length / 10) : 1);
    }
  }, [issues]);

  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <a
          key={i}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(i);
          }}
          className={
            currentPage === i ? "font-bold text-blue-600" : "text-gray-600"
          }
        >
          {i}
        </a>
      );
    }
    return links;
  };

  const renderCurrentPageIssues = () => {
    const issuesPerPage = 10;

    const startIndex = (currentPage - 1) * issuesPerPage;
    const endIndex = startIndex + issuesPerPage;
    if (issues) {
      const currentPageIssues = issues.slice(startIndex, endIndex);
      return (
        <>
          {currentPageIssues.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LayoutGrid size={28} />
            <h1 className="text-2xl font-bold">Task Board By Tech Flow</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <span>Loading the Tasks</span>
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues && renderCurrentPageIssues()}
            <div
              onClick={() => navigateToInputForm()}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col items-center justify-center group"
            >
              <Plus
                size={48}
                className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Create New Task
              </h3>
            </div>
          </div>
        )}
      </main>
      <div className="flex justify-center items-center gap-x-4">
        {renderPaginationLinks()}
      </div>
    </div>
  );
};
export default TaskBoard;
