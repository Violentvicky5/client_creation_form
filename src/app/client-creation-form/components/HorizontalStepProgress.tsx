'use client';

type HorizontalStepProgressProps = {
  currentStep: number;
  maxReachedStep: number;
  onStepChange: (step: 1 | 2 | 3 | 4) => void;
};


const steps = [
  { id: 1, label: 'Company' },
  { id: 2, label: 'Product' },
  { id: 3, label: 'Subscription' },
  { id: 4, label: 'Final Admin' },
] as const;

export default function HorizontalStepProgress({
  currentStep,
  maxReachedStep,
  onStepChange,
}: HorizontalStepProgressProps) {

  return (
    <div className="w-full max-w-[1200px] bg-white p-6 sm:p-8 md:p-10 rounded-4xl shadow-md overflow-hidden">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isDisabled = step.id > maxReachedStep;


          return (
            <div
              key={step.id}
              className="relative flex w-18 flex-col items-center sm:w-32 lg:w-40"
            >
              {/* Left connector */}
              {index !== 0 && (
                <div
                  className={`absolute top-4 left-0 h-0.5
                    sm:top-[18px] lg:top-5
                    w-[calc(50%-20px)]
                    ${step.id <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              )}

              {/* Right connector */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-4 right-0 h-0.5
                    sm:top-[18px] lg:top-5
                    w-[calc(50%-20px)]
                    ${step.id < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              )}

              {/* Circle → Button */}
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onStepChange(step.id)}
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold
                  sm:h-9 sm:w-9
                  lg:h-10 lg:w-10
                  ${
                    isCompleted
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : isCurrent
                      ? 'border-blue-600 text-blue-600'
                      : 'border-gray-300 text-gray-400'
                  }
                  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {step.id}
              </button>

              <span className="mt-2 text-center text-[10px] sm:text-[11px] text-gray-600">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
