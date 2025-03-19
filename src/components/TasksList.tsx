import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../constants/types";
import supabase from "../services/supabase";
import { Loader } from "lucide-react";
import useAuthStore from "../stores/AuthStore";

function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      if (data) setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, [user?.id]);
  return (
    <section className="space-y-4">
      {loading && <Loader className="animate-spin mx-auto" size={32} />}

      {tasks.length === 0 && !loading && (
        <p className="text-base-content text-center">No tasks</p>
      )}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </section>
  );
}

export default TasksList;
