import React from "react";
import { HiChevronRight } from "react-icons/hi";

type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  id: number;
  label: string;
  status: StepStatus;
}

const steps: Step[] = [
  { id: 1, label: "Company Info", status: "complete" },
  { id: 2, label: "Products", status: "current" },
  { id: 3, label: "Subscription Plan", status: "upcoming" },
  { id: 4, label: "Admin Creation", status: "upcoming" },
  { id: 5, label: "Completed", status: "upcoming" },
];

const BadgeProgressBar = () => {
  return (
    <div className="mt-4 w-full overflow-x-auto">
      <nav
        aria-label="Progress"
        className="w-full rounded-md border border-gray-300 p-2 sm:p-4"
      >
        <div className="flex flex-col gap-4 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between">
          {steps.map((step, index) => {
            const isComplete = step.status === "complete";
            const isCurrent = step.status === "current";
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.id}>
                {/* Step */}
                <div className="flex flex-col items-center min-[500px]:flex-1 min-[500px]:min-w-0">
                  <div
                    className={`flex items-center justify-center rounded-full font-semibold
                      h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[10px] lg:text-[14px]
                      ${
                        isComplete
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "border border-blue-500 text-blue-500"
                          : "border border-gray-300 text-gray-400"
                      }`}
                  >
                    {isComplete ? "✓" : String(step.id).padStart(2, "0")}
                  </div>

                  <span
                    className={`mt-1 text-center text-[10px] sm:text-[10px] lg:text-[14px]
                      truncate
                      ${
                        isComplete
                          ? "text-emerald-600"
                          : isCurrent
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Chevron between steps */}
                {!isLast && (
                  <div className="hidden min-[500px]:flex items-center">
                    <HiChevronRight className="h-full w-6 text-gray-300" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BadgeProgressBar;
