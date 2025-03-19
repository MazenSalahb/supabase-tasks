import { useQuery } from "@tanstack/react-query";
import supabase from "./supabase";
import { Task } from "../constants/types";

export const useGetTasks = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch tasks");
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data as Task[];
    },
    enabled: !!userId, // Only run the query if userId is defined
  });
};
