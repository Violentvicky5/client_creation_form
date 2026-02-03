"use client";
import { AiOutlineClose } from "react-icons/ai";
import { HorizontalStepProgressProps } from "../type/step1form";
import { useRouter } from "next/navigation";
const steps = [
  { id: 1, label: "Company" },
  { id: 2, label: "Product" },
  { id: 3, label: "Subscription" },
  { id: 4, label: "Final Admin" },
] as const;
export default function HorizontalStepProgress({
  currentStep,
  maxReachedStep,
  onStepChange,
  isStepFourSubmitted,
}: HorizontalStepProgressProps) {
 const router = useRouter();

  return (
    <div className="w-full max-w-[1200px] bg-white p-4 rounded-4xl shadow-sm">
       <div className="flex justify-between">
  <span className="mb-2 text-xs font-semibold text-gray-600">
    Client Creation
  </span>

  <span
    className="mb-2 h-4 w-4  rounded-4xl text-xs font-semibold text-gray-600 cursor-pointer hover:text-red-600 "
    onClick={() => router.push("/")}
  >
    <AiOutlineClose size={14} />
  </span>
</div>
    <div className="w-full max-w-full bg-white p-1  sm:p-2 md:p-3 rounded-4xl  overflow-hidden">
     
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted =
            step.id < currentStep || (step.id === 4 && isStepFourSubmitted);
          const isCurrent = step.id === currentStep;
          const isDisabled = isStepFourSubmitted || step.id > maxReachedStep; // either one of em true then sets isDisbled to true

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
                    ${step.id <= currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                />
              )}

              {/* Right connector */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-4 right-0 h-0.5
                    sm:top-[18px] lg:top-5
                    w-[calc(50%-20px)]
                    ${step.id < currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                />
              )}

              {/* Circle Button */}
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onStepChange(step.id)}
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[12px] font-semibold
                  sm:h-9 sm:w-9
                  lg:h-10 lg:w-10
                  ${
                    isCompleted
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isCurrent
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-400"
                  }
                  ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
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
</div>  );
}
