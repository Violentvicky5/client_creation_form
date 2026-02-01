"use client";

type SuccessPageProps = {
  clientName?: string;
};

export default function SuccessPage({ clientName }: SuccessPageProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
        <svg
          className="mx-auto mb-4 w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Congratulations!
        </h1>

        <p className="text-gray-600 mb-4">
          {clientName
            ? `Your client "${clientName}" has been successfully created.`
            : "Your client creation is successful."}
        </p>

        <button
          className="mt-4 px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition"
          onClick={() => window.location.reload()}
        >
          Create Another Client
        </button>
      </div>
    </div>
  );
}
