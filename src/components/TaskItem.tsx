import { useState } from "react";
import { Task } from "../constants/types";
import supabase from "../services/supabase";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

function TaskItem({
  task,
  refetchTasks,
}: {
  task: Task;
  refetchTasks: () => void;
}) {
  const [completed, setCompleted] = useState(task.completed);
  const handleCheck = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", task.id);
    if (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    } else {
      setCompleted(!completed);
      console.log("Task updated successfully");
      toast.success("Task updated successfully");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    } else {
      console.log("Task deleted successfully");
      toast.success("Task deleted successfully");
      refetchTasks();
    }
  };
  return (
    <div className="p-6 rounded flex justify-between items-center border border-base-300">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        {task.description && <p className="text-sm">{task.description}</p>}
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          className="checkbox"
          onChange={handleCheck}
        />

        <button className="btn btn-circle btn-sm" onClick={handleDelete}>
          <Trash size={16} className="text-error" />
        </button>
        <Link to={`/edit/${task.id}`} className="btn btn-circle btn-sm">
          <Pencil size={16} className="text-primary" />
        </Link>
      </div>
    </div>
  );
}

export default TaskItem;
