import { Plus } from "lucide-react";
import Hero from "../components/Hero";
import useAuthStore from "../stores/AuthStore";
import { Link } from "react-router";
import TasksList from "../components/TasksList";

function HomeView() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <div className="min-h-screen bg-base-200">
      {user ? (
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          <section className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
              Welcome back, {user.user_metadata.full_name}!
            </h1>
            <div className="space-x-3">
              <Link to={"/create"} className="btn btn-circle">
                <Plus size={18} />
              </Link>
              <button className="btn" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </section>

          <TasksList />
        </div>
      ) : (
        <Hero />
      )}
    </div>
  );
}

export default HomeView;
