'use client';

type StepFourPageProps = {
  onPrevious: () => void;
  onNext?: () => void;
};

export default function StepThree({
  onNext,
  onPrevious,
}: StepFourPageProps) {
  return (
    <div className="min-h-screen flex justify-center py-6 mt-2">
      <div className="w-full max-w-[1200px] bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
        <h2 className="mb-6 text-sm font-semibold text-gray-800 sm:text-base lg:text-lg">
          Step 4 – final
        </h2>

        <div className="mb-10 text-sm text-gray-600">
        final content here
        </div>

        <div className="flex justify-between">
        <button
        type="button"
        onClick={onPrevious}
            className="w-16 h-7 py-1.5 bg-gray-500 text-white rounded text-xs hover:bg-gray-400 transition"
      >
        Previous
      </button>

      {/* Next button — render ONLY if provided */}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>
      )}
        </div>
      </div>
    </div>
  );
}
