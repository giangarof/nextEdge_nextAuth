"use client";
import { AlertTriangle } from "lucide-react";
const ErrorPage = ({ error }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-center px-6 pt-24">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          {error?.message || "An unexpected error has occurred."}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
