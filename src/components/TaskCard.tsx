import React, { useState } from "react";
import { Calendar, X } from "lucide-react";
import { Task } from "../types";

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {task.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-5">{task.description}</p>
        <div className="flex items-center text-blue-600">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">Due Date - {formatDate(task.dueDate)}</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {task.title}
            </h2>
            <div className="mb-6">
              <p className="text-gray-600 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
            <div className="flex items-center text-blue-600">
              <Calendar size={18} className="mr-2" />
              <span>Due Date - {formatDate(task.dueDate)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
