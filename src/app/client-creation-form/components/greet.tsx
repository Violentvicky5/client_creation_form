"use client";
import { SuccessPageProps } from "../type/step1form";

export default function SuccessPage({ clientName }: SuccessPageProps) {
  return (
    <div className="mt-6 rounded-4xl flex justify-center items-start py-10">
      <div className="bg-white shadow-md rounded-lg px-6 py-6 text-center max-w-sm w-full">
        <svg
          className="mx-auto mb-3 w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-lg font-semibold text-gray-800 mb-1">Completed!</h1>

        <p className="text-sm text-gray-600 mb-4">
          Client
          <span className="ml-1 font-semibold text-[15px] text-blue-700">
            "{clientName}"
          </span>{" "}
          Created Successfully
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-1.5 text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition"
        >
          Create Another Client
        </button>
      </div>
    </div>
  );
}
