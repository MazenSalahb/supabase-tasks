import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

function EditTaskView() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        supabase.from("tasks").select().eq("id", id).then(({ data, error }) => {
            if (error) {
                console.error("Error fetching task:", error);
            } else {
                setFormState(data[0]);
            }
        });
    }, [id]);

    async function handleEditTask(e: React.FormEvent) {
        e.preventDefault();

        supabase
            .from("tasks")
            .update(formState)
            .eq("id", id)
            .then((response) => {
                if (response.error) {
                    console.error("Error updating task:", response.error);
                } else {
                    console.log("Task updated successfully");
                    toast.success("Task updated successfully");
                    navigate("/");
                }
            });
    }
  return (
    <div className="min-h-screen bg-base-200">
      <form
        onSubmit={handleEditTask}
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
          Edit
        </button>
      </form>
    </div>
  )
}

export default EditTaskView
