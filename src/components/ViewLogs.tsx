// src/pages/LogsPage.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loggingService, TaskLog } from '../services/loggingService';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface GroupedLogs {
  [date: string]: TaskLog[];
}

export function ViewLogs() {
  const [logs, setLogs] = useState<TaskLog[]>([]);
  const [loading, setLoading] = useState(true);
  const teamId = useSelector((state: any) => state.user.teamId);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await loggingService.getLogsByTeamId(teamId);
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [teamId]);

  const groupLogsByDate = (logs: TaskLog[]): GroupedLogs => {
    return logs.reduce((groups: GroupedLogs, log) => {
      const date = format(parseISO(log.created_at!), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
      return groups;
    }, {});
  };

  const getStatusColor = (logType: string) => {
    switch (logType) {
      case 'TASK_CREATED':
        return 'bg-green-500';
      case 'TASK_UPDATED':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const groupedLogs = groupLogsByDate(logs);
  const dates = Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Activity Timeline</h1>

      <div className="space-y-8">
        {dates.map((date) => (
          <div key={date} className="relative">
            <div className="sticky top-0 z-10 py-2">
              <h2 className="text-lg font-semibold text-gray-700">
                {formatDate(date)}
              </h2>
            </div>

            <div className="ml-4">
              {groupedLogs[date].map((log, index) => (
                <div key={`${log.created_at}-${index}`} className="relative pl-6 pb-8">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-200"></div>

                  {/* Timeline dot */}
                  <div className={`absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full ${getStatusColor(log.log_type)}`}></div>

                  {/* Content */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          log.log_type === 'TASK_CREATED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {log.log_type === 'TASK_CREATED' ? 'Created' : 'Updated'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTime(log.created_at!)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ID: {log.task_id}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">
                        {log.details.title}
                      </h3>
                      {log.details.description && (
                        <p className="text-sm text-gray-600">
                          {log.details.description}
                        </p>
                      )}
                      <div className="text-sm text-gray-500">
                        {log.details.state && (
                          <div>Status: {log.details.state}</div>
                        )}
                        {log.details.priority && (
                          <div>Priority: {log.details.priority}</div>
                        )}
                        {log.details.assignee && (
                          <div>Assignee: {log.details.assignee}</div>
                        )}
                      </div>
                    </div>
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