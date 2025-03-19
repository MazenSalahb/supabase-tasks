import { useState } from "react";
import supabase from "../services/supabase";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function CreateTaskView() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();

    supabase
      .from("tasks")
      .insert([formState])
      .then((response) => {
        if (response.error) {
          toast.error("An error occurred while creating the task");
        } else {
          toast.success("Task created successfully");
          setFormState({ title: "", description: "" });
          navigate("/");
        }
      });
  }

  return (
    <div className="min-h-screen bg-base-200">
      <form
        onSubmit={handleCreateTask}
        className="max-w-4xl mx-auto p-8 space-y-6 flex flex-col"
      >
        <h1 className="text-lg">Create new Task</h1>
        <input
          type="text"
          placeholder="task title"
          className="input w-full focus:outline-slate-400 focus:border-slate-400"
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />
        <textarea
          className="textarea w-full focus:outline-slate-400 focus:border-slate-400"
          placeholder="task description"
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
        ></textarea>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTaskView;
