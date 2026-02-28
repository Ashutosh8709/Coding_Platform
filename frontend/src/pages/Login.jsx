import { useState } from "react";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export default function Login() {
  const { loginUser, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErr("All fields are required");
      setFormData({ email: "", password: "" });
      return;
    }
    setErr("");
    const res = await loginUser(formData);
    setFormData({ email: "", password: "" });
    if (res) navigate("/problems");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center px-4 pt-14 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/6 blur-[140px] pointer-events-none" />
      <div className="animate-scale-in relative z-10 w-full max-w-sm bg-white/90 dark:bg-dark-800/90 border border-gray-200 dark:border-dark-500 rounded-2xl p-9 shadow-2xl dark:shadow-black/60 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
            <span className="text-white font-black text-base">CF</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-400 dark:text-dark-300 mt-2">
            Sign in to your CodeForge account
          </p>
        </div>

        <InputField
          label="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          setFormData={setFormData}
        />
        <InputField
          label="password"
          type="password"
          value={formData.password}
          placeholder="**********"
          setFormData={setFormData}
        />

        {err && (
          <p className="text-red-400 text-xs font-semibold mb-3">{err}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl gradient-brand text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-glow-md transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Spinner size={3} /> Signing in...
            </>
          ) : (
            "Sign in →"
          )}
        </button>

        <p className="text-center text-sm text-gray-400 dark:text-dark-300 mt-5">
          No account?{" "}
          <Link
            to={"/signup"}
            className="text-brand-500 font-bold hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
