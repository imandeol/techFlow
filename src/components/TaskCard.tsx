import React, { useEffect, useState } from "react";
import { Calendar, Edit2, User, X, Loader2 } from "lucide-react";
import { Task } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { updateLinearTask, UpdateLinearTaskAction } from "../redux/actions";
import { Dispatch } from "@reduxjs/toolkit";
import { updateTaskSuccess } from "../redux/reducers/updateTaskReducer";

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
  const teamMembers = useSelector(
    (state: RootState) => state.teamMembers.members
  );
  const updateTaskStatus = useSelector(
    (state: RootState) => state.updateTaskSuccess.success
  );

  const taskStatusValues = useSelector(
    (state: RootState) => state.workflow.workflowStates
  );

  useEffect(() => {
    setIsSaving(false);
    dispatch(updateTaskSuccess(false));
  }, [updateTaskStatus]);

  const dispatch = useDispatch();
  const [teamMembersList, setTeamMembersList] = useState(teamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(task.assignee);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [statusOfTask, setStatusOfTask] = useState(task.status);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (!task.assignee) {
      setTeamMembersList([
        {
          id: "",
          email: "",
          name: "",
        },
        ...teamMembersList,
      ]);
    }
  }, [task]);

  const handleAssigneeChange = (id: string) => {
    setSelectedAssignee(id);
    setIsEditingAssignee(false);
  };

  const handleStatusChange = (id: string) => {
    setStatusOfTask(id);
    setIsEditingStatus(false);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    setIsEditingDueDate(false);
  };

  const handleTaskSave = async () => {
    setIsSaving(true);
    dispatch(
      updateLinearTask({
        taskId: task.id || "",
        assigneeId: selectedAssignee,
        description,
        status:
          taskStatusValues.find((status) => status.value === statusOfTask)
            ?.id || "",
        dueDate: dueDate,
      })
    );
  };

  const today = new Date().toISOString().split("T")[0];

  const EditableField = ({
    value,
    onEdit,
    className = "",
  }: {
    value: string;
    onEdit: () => void;
    className?: string;
  }) => (
    <div
      className={`group relative inline-flex items-center space-x-2 ${className}`}
    >
      <span className="font-medium">{value}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {task.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-5">{description}</p>
        <div className="flex items-center text-blue-600">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">
            Due Date - {dueDate ? formatDate(dueDate) : "No due date"}
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              disabled={isSaving}
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {task.title}
            </h2>
            <div className="mb-6 relative">
              {isEditingDescription ? (
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  onBlur={() => setIsEditingDescription(false)}
                  className="w-full min-h-[100px] p-3 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  disabled={isSaving}
                />
              ) : (
                <div className="group relative">
                  <p className="text-gray-600 whitespace-pre-wrap pr-8">
                    {description}
                  </p>
                  <button
                    onClick={() => setIsEditingDescription(true)}
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700"
                    disabled={isSaving}
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-2" />
                    {isEditingAssignee ? (
                      <select
                        value={selectedAssignee}
                        onChange={(e) => handleAssigneeChange(e.target.value)}
                        className="px-2 py-1 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        disabled={isSaving}
                      >
                        {teamMembersList.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <EditableField
                        value={
                          teamMembersList.find(
                            (member) => member.id === selectedAssignee
                          )?.name || ""
                        }
                        onEdit={() => !isSaving && setIsEditingAssignee(true)}
                      />
                    )}
                  </div>
                </div>
                {isEditingStatus ? (
                  <select
                    value={statusOfTask}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-2 py-1 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    disabled={isSaving}
                  >
                    {taskStatusValues.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <EditableField
                    value={statusOfTask}
                    onEdit={() => !isSaving && setIsEditingStatus(true)}
                  />
                )}
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar size={18} className="mr-2 text-blue-600" />
                {isEditingDueDate ? (
                  <input
                    type="date"
                    value={dueDate}
                    onChange={handleDueDateChange}
                    min={today}
                    className="px-2 py-1 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onBlur={() => setIsEditingDueDate(false)}
                    disabled={isSaving}
                  />
                ) : (
                  <EditableField
                    value={`Due Date - ${
                      dueDate ? formatDate(dueDate) : "No due date"
                    }`}
                    onEdit={() => !isSaving && setIsEditingDueDate(true)}
                  />
                )}
              </div>
              <div className="flex justify-end mt-6 pt-4 border-t">
                <button
                  onClick={handleTaskSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Updating task...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </div>

            {/* Loading Overlay */}
            {isSaving && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-xl">
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 size={24} className="animate-spin text-blue-600" />
                  <span className="text-blue-600 font-medium">
                    Updating task...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
