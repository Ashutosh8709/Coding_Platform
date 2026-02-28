import { useState } from "react";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const { signupUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErr("All fields are required");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setErr("Both Password and Confirm Password should be same");
      return;
    }
    const res = await signupUser(formData);
    setFormData(
      (prev) => (prev.name = ""),
      (prev.email = ""),
      (prev.password = ""),
      (prev.confirmPassword = ""),
    );
    if (res) navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center px-4 pt-14 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/6 blur-[140px] pointer-events-none" />
      <div className="animate-scale-in relative z-10 w-full max-w-sm bg-white/90 dark:bg-dark-800/90 border border-gray-200 dark:border-dark-500 rounded-2xl p-9 shadow-2xl dark:shadow-black/60 backdrop-blur-xl mb-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
            <span className="text-white font-black text-base">CF</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-gray-400 dark:text-dark-300 mt-2">
            Join 280K+ engineers on CodeForge
          </p>
        </div>

        {[
          {
            label: "Full Name",
            type: "text",
            value: formData.name,
            placeholder: "Enter your name",
          },
          {
            label: "Email",
            type: "email",
            value: formData.email,
            placeholder: "Enter your email",
          },
          {
            label: "Password",
            type: "password",
            value: formData.password,
            placeholder: "**********",
          },
          {
            label: "Confirm Password",
            type: "password",
            value: formData.confirmPassword,
            placeholder: "**********",
          },
        ].map((f) => (
          <InputField
            label={f.label}
            type={f.type}
            value={f.value}
            placeholder={f.placeholder}
            setFormData={setFormData}
          />
        ))}

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
              <Spinner size={3} /> Creating...
            </>
          ) : (
            "Create account →"
          )}
        </button>

        <p className="text-center text-sm text-gray-400 dark:text-dark-300 mt-5">
          Have an account?{" "}
          <Link
            to={"/login"}
            className="text-brand-500 font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
