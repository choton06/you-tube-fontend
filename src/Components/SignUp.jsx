import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassWord, setUserPassWord] = useState("");
  const [AvatarUrl, setAvatarUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!UserName.trim()) newErrors.UserName = "Name is required";
    if (!UserEmail.trim()) newErrors.UserEmail = "Email is required";
    if (!UserPassWord.trim()) newErrors.UserPassWord = "Password is required";
    if (!AvatarUrl.trim()) newErrors.AvatarUrl = "Avatar URL is required";
    return newErrors;
  };

  async function HandleSignUp(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch("https://you-tube-backend-by-p.onrender.com/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: UserName,
          Email: UserEmail,
          Password: UserPassWord,
          AvatarUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return alert(`Error: ${errorData.message}`);
      }

      const result = await response.json();
      if (result) {
        alert("Sign up successful!");
        navigate("/logIn");
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  }

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-4xl flex flex-col md:flex-row rounded-3xl shadow-md p-6">
        {/* Left Side */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="w-28 mb-4"
          />
          <h1 className="font-semibold text-4xl">Sign Up</h1>
          <p className="text-center text-gray-500 mt-2">to continue to YouTube</p>
        </div>

        {/* Right Side */}
        <form
          className="md:w-1/2 mt-6 md:mt-0 p-4 flex flex-col items-center"
          onSubmit={HandleSignUp}
        >
          <input
            type="text"
            className={`ring-1 w-full my-2 p-3 rounded-md ${
              errors.UserName ? "ring-red-500" : "ring-gray-300"
            }`}
            placeholder="Enter your Name"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.UserName && (
            <p className="text-red-500 text-sm w-full">{errors.UserName}</p>
          )}

          <input
            type="email"
            className={`ring-1 w-full my-2 p-3 rounded-md ${
              errors.UserEmail ? "ring-red-500" : "ring-gray-300"
            }`}
            placeholder="Enter your Email"
            value={UserEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {errors.UserEmail && (
            <p className="text-red-500 text-sm w-full">{errors.UserEmail}</p>
          )}

          {/* Password input with show/hide */}
          <div className="relative w-full my-2">
            <input
              type={showPassword ? "text" : "password"}
              className={`ring-1 w-full p-3 rounded-md pr-10 ${
                errors.UserPassWord ? "ring-red-500" : "ring-gray-300"
              }`}
              placeholder="Enter your Password"
              value={UserPassWord}
              onChange={(e) => setUserPassWord(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          {errors.UserPassWord && (
            <p className="text-red-500 text-sm w-full">{errors.UserPassWord}</p>
          )}

          <input
            type="text"
            className={`ring-1 w-full my-2 p-3 rounded-md ${
              errors.AvatarUrl ? "ring-red-500" : "ring-gray-300"
            }`}
            placeholder="Enter Avatar URL"
            value={AvatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          {errors.AvatarUrl && (
            <p className="text-red-500 text-sm w-full">{errors.AvatarUrl}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md p-3 w-full mt-4"
          >
            Sign Up
          </button>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Not your computer? Use Guest mode to sign in privately.{" "}
            <span className="text-blue-600 cursor-pointer">
              Learn more about using Guest mode
            </span>
          </p>

          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/logIn" className="text-blue-700 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
