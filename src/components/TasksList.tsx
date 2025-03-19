import TaskItem from "./TaskItem";
import { Loader } from "lucide-react";
import useAuthStore from "../stores/AuthStore";
import { useGetTasks } from "../services/queries";

function TasksList() {
  const user = useAuthStore((s) => s.user);
  const { data, isPending, refetch } = useGetTasks(user?.id);

  return (
    <section className="space-y-4">
      {isPending && <Loader className="animate-spin mx-auto" size={32} />}

      {data?.length === 0 && !isPending && (
        <p className="text-base-content text-center">No tasks</p>
      )}

      {data?.map((task) => (
        <TaskItem key={task.id} task={task} refetchTasks={refetch} />
      ))}
    </section>
  );
}

export default TasksList;
