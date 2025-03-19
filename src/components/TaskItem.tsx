import { useState } from "react";
import { Task } from "../constants/types";
import supabase from "../services/supabase";

function TaskItem({ task }: { task: Task }) {
  const [completed, setCompleted] = useState(task.completed);
  const handleCheck = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", task.id);
    if (error) {
      console.error("Error updating task:", error);
    } else {
      setCompleted(!completed);
    }
  };
  return (
    <div className="p-6 rounded flex justify-between items-center border border-base-300">
      <p>{task.title}</p>
      <input
        type="checkbox"
        checked={completed}
        className="checkbox"
        onChange={handleCheck}
      />
    </div>
  );
}

export default TaskItem;
