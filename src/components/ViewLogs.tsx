import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loggingService, TaskLog } from "../services/loggingService";
import { format, parseISO } from "date-fns";
import { Loader2, ArrowRight } from "lucide-react";
import { RootState } from "../redux/reducer";
import { useNavigate } from "react-router-dom";

interface GroupedLogs {
  [date: string]: TaskLog[];
}

export function ViewLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<TaskLog[]>([]);
  const [loading, setLoading] = useState(true);
  const teamId = useSelector((state: any) => state.user.teamId);
  const { access_token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!access_token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await loggingService.getLogsByTeamId(teamId);
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [teamId]);

  const groupLogsByDate = (logs: TaskLog[]): GroupedLogs => {
    return logs.reduce((groups: GroupedLogs, log) => {
      const date = format(parseISO(log.created_at!), "yyyy-MM-dd");
      if (!groups[date]) groups[date] = [];
      groups[date].push(log);
      return groups;
    }, {});
  };

  const formatTime = (dateString: string) =>
    format(parseISO(dateString), "h:mm a");
  const formatDate = (dateString: string) =>
    format(parseISO(dateString), "MMMM d, yyyy");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const groupedLogs = groupLogsByDate(logs);
  const dates = Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a));

  const renderChangeDetails = (log: TaskLog) => {
    if (log.log_type === "TASK_CREATED") {
      return (
        <div className="space-y-2 text-sm">
          <h3 className="font-medium text-gray-900">{log.details.title}</h3>
          {log.details.description && (
            <p className="text-gray-600">{log.details.description}</p>
          )}
        </div>
      );
    }

    const hasStatusChange = log.details.prevStatus !== log.details.newStatus;
    const hasAssigneeChange =
      log.details.prevAssignee !== log.details.newAssignee;
    const hasDescriptionChange =
      log.details.prevDescription !== log.details.newDescription;

    return (
      <div className="space-y-3 text-sm">
        <h3 className="font-medium text-gray-900">{log.details.title}</h3>

        {hasStatusChange && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">{log.details.prevStatus}</span>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-blue-600">
              {log.details.newStatus}
            </span>
          </div>
        )}

        {hasAssigneeChange && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">{log.details.prevAssignee}</span>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-blue-600">
              {log.details.newAssignee}
            </span>
          </div>
        )}

        {hasDescriptionChange && (
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-gray-500">
                <span className="font-medium text-gray-700">
                  Previous description:
                </span>
                <p className="mt-1">
                  {log.details.prevDescription || "No description"}
                </p>
              </div>
              <div className="mt-3 text-gray-900">
                <span className="font-medium text-gray-700">
                  New description:
                </span>
                <p className="mt-1">
                  {log.details.newDescription || "No description"}
                </p>
              </div>
            </div>
          </div>
        )}

        {!hasStatusChange && !hasAssigneeChange && !hasDescriptionChange && (
          <p className="text-gray-500 italic">No changes detected</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Activity Timeline</h1>
      <div className="space-y-8">
        {dates?.map((date) => (
          <div key={date} className="relative">
            <div className="sticky top-0 z-10 py-2">
              <h2 className="text-lg font-semibold text-gray-700">
                {formatDate(date)}
              </h2>
            </div>

            <div className="ml-4">
              {groupedLogs[date]?.map((log, index) => (
                <div
                  key={`${log.created_at}-${index}`}
                  className="relative pl-6 pb-8"
                >
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-200" />
                  <div
                    className={`absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full ${
                      log.log_type === "TASK_CREATED"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />

                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            log.log_type === "TASK_CREATED"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {log.log_type === "TASK_CREATED"
                            ? "Created"
                            : "Updated"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTime(log.created_at!)}
                        </span>
                      </div>
                    </div>
                    {renderChangeDetails(log)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {dates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No activity logs found.
          </div>
        )}
      </div>
    </div>
  );
}
