import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../utils/UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function LogIn() {
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassWord, setUserPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserContext);

  async function HandleLogIn(e) {
    e.preventDefault();

    const newErrors = {
      email: UserEmail.trim() === "",
      password: UserPassWord.trim() === "",
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    try {
      const response = await fetch("https://you-tube-backend-by-p.onrender.com/LogIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: UserEmail, Password: UserPassWord }),
      });

      const result = await response.json();

      if (!response.ok || result.message === "Invalid credentials") {
        return toast.error(`Error: ${result.message || "Invalid login"}`);
      }

      localStorage.setItem("accessToken", result.accessToken);

      const userRes = await fetch("https://you-tube-backend-by-p.onrender.com/user/me", {
        headers: { Authorization: `Bearer ${result.accessToken}` },
      });

      const userData = await userRes.json();
      setUserDetails(userData);
      toast.success("Log In successful!");
      navigate("/");
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Network error. Please try again later.");
    }
  }

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start rounded-2xl shadow-xl overflow-hidden">
        {/* Left side */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <img
            src="https://www.gstatic.com/images/branding/product/2x/youtube_48dp.png"
            alt="YouTube Logo"
            width="48"
            height="48"
            className="mb-4"
          />
          <h1 className="text-3xl font-semibold mb-2">Sign In</h1>
          <p className="text-gray-600">to continue to YouTube</p>
        </div>

        {/* Right side (form) */}
        <form
          onSubmit={HandleLogIn}
          className="w-full md:w-1/2 bg-white p-6 md:p-10 space-y-4"
        >
          <input
            type="email"
            placeholder="Enter your Email"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 ring-red-300" : "ring-blue-300"
            }`}
            value={UserEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password input with eye icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 pr-10 ${
                errors.password ? "border-red-500 ring-red-300" : "ring-blue-300"
              }`}
              value={UserPassWord}
              onChange={(e) => setUserPassWord(e.target.value)}
            />
            <FontAwesomeIcon
              icon={!showPassword ?  faEyeSlash : faEye }
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <p className="text-sm text-blue-500 font-medium hover:underline cursor-pointer">
            Forgot email?
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>

          <p className="text-sm text-gray-600">
            Not your computer? Use Guest mode to sign in privately.{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              Learn more
            </span>
          </p>

          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;





