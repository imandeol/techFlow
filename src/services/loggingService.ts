import { createClient } from "@supabase/supabase-js";
//@ts-ignore
import { configs } from "../../config";

console.log("configs", configs);
const supabase = createClient(
  "https://sbtwpkizmnbuekhgqbit.supabase.co",
  configs.supabaseKey
);
export type LogType = "TASK_CREATED" | "TASK_UPDATED";

export interface TaskLog {
  team_id: string;
  task_id: string;
  log_type: LogType;
  details: any;
  created_at?: string;
}

export const loggingService = {
  async createLog(log: TaskLog) {
    const { data, error } = await supabase.from("task_logs").insert([log]);

    if (error) throw error;
    return data;
  },

  async getLogsByTeamId(teamId: string) {
    const { data, error } = await supabase
      .from("task_logs")
      .select("*")
      .eq("team_id", teamId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
