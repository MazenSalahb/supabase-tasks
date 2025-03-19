import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import supabase from "../services/supabase";

type AuthStoreType = {
  user: User | undefined;

  signInWithGoogle: () => void;
  signOut: () => void;
  checkAuth: () => void;
};

const useAuthStore = create<AuthStoreType>((set) => ({
  user: undefined,

  signInWithGoogle: async () => {
    // Sign in with Google
    await supabase.auth.signInWithOAuth({ provider: "google" });
  },

  signOut: async () => {
    // Sign out
    await supabase.auth.signOut();
  },

  checkAuth: () => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ user: session?.user });
    });
  },
}));

export default useAuthStore;
