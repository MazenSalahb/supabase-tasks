import { Route, Routes } from "react-router";
import HomeView from "./views/HomeView";
import useAuthStore from "./stores/AuthStore";
import { useEffect } from "react";
import supabase from "./services/supabase";
import CreateTaskView from "./views/CreateTaskView";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [checkAuth]);
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/create" element={<CreateTaskView />} />
    </Routes>
  );
}

export default App;
