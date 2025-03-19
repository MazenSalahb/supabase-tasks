import GoogleIcon from "../assets/google.png";
import useAuthStore from "../stores/AuthStore";

function Hero() {
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  return (
    <section className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to your <span className="text-primary">Task Manager</span>
          </h1>
          <p className="py-6">
            Organize your tasks with ease. Sign in to get started.
          </p>
          <button className="btn" onClick={signInWithGoogle}>
            <img src={GoogleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
