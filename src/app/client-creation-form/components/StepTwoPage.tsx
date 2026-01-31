'use client';

export default function StepTwoPage({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  return (
    <div className="min-h-screen flex justify-center py-6 mt-2">
      <div className="w-full max-w-[1200px] bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
        <h2 className="mb-6 text-sm font-semibold text-gray-800 sm:text-base lg:text-lg">
          Step 2 – Product
        </h2>

        <div className="mb-10 text-sm text-gray-600">
          Product form/content goes here
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="w-16 h-7 py-1.5 bg-gray-500 text-white rounded text-xs hover:bg-gray-400 transition"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={onNext}
            className="w-16 h-7 py-1.5 bg-blue-700 text-white rounded text-xs hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
