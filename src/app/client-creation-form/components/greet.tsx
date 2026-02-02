"use client";

type SuccessPageProps = {
  clientName?: string;
};

export default function SuccessPage({ clientName }: SuccessPageProps) {
  return (
    <div className="flex justify-center items-start py-10 bg-gray-50">
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

        <h1 className="text-lg font-semibold text-gray-800 mb-1">
          Congratulations!
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          {clientName
            ? `Client "${clientName}" created successfully.`
            : "Client created successfully."}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-1.5 text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition"
        >
          Create Another
        </button>
      </div>
    </div>
  );
}
