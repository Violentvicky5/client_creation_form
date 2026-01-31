'use client';

type CircularStepProgressProps = {
  currentStep: 1 | 2 | 3 | 4;
  size?: number; 
  strokeWidth?: number;
};

export default function CircularStepProgress({
  currentStep,
  size = 120,
  strokeWidth = 10,
}: CircularStepProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressPercent = (currentStep / 4) * 100;
  const offset =
    circumference - (progressPercent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-gray-200"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none stroke-blue-600 transition-all duration-300"
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-semibold">
          {currentStep}/4
        </span>
        <span className="text-xs text-gray-500">
          Step
        </span>
      </div>
    </div>
  );
}
