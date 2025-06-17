
import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.error("Route Error:", error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
        <p className="text-lg text-gray-700 mb-2">
          {error.status || "Error"} - {error.statusText || "Unexpected Error"}
        </p>
        <p className="text-sm text-gray-600 italic">
          {error?.data?.message || error?.message || "We couldn’t load this page right now."}
        </p>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorElement;
