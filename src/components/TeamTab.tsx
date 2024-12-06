import React, { useEffect } from "react";
import { User } from "lucide-react";
import { RootState } from "../redux/reducer";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

const TeamTab: React.FC = () => {
  const teamMembers = useSelector(
    (state: RootState) => state.teamMembers.members
  );

  const { access_token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!access_token) {
      redirect("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        </div>

        {/* Team Members Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {member.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="text-gray-700 text-sm">
            You can add team members by navigating to{" "}
            <strong>Settings &gt; Workspace &gt; Members</strong> in the Linear
            App and send invitations via email.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamTab;
