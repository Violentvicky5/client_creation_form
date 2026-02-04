import React from "react";

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

const CircularStepperMobile = () => {
  const diameter = 180; // Outer circle diameter
  const radius = diameter / 2;
  const center = radius;
  const totalSteps = steps.length;

  const currentStep = steps.find((s) => s.status === "current") || steps[0];

  return (
    <div className="block md:hidden p-4 flex justify-center">
      <div
        className="relative"
        style={{ width: diameter, height: diameter }}
      >
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>

        {/* Steps on circumference */}
        {steps.map((step, index) => {
          // Angle in radians for each step (start from top)
          const angle = (index / totalSteps) * 2 * Math.PI - Math.PI / 2;

          const stepSize = 28; // diameter of step circle
          // Center of step circle on circumference
          const x = center + radius * Math.cos(angle) - stepSize / 2;
          const y = center + radius * Math.sin(angle) - stepSize / 2;

          const isComplete = step.status === "complete";
          const isCurrent = step.status === "current";

          return (
            <div
              key={step.id}
              className={`absolute flex items-center justify-center rounded-full font-semibold
                ${isComplete ? "bg-emerald-600 text-white" : ""} 
                ${isCurrent ? "border border-blue-500 text-blue-500 bg-white" : ""}
                ${!isComplete && !isCurrent ? "border border-gray-300 text-gray-400 bg-white" : ""}`}
              style={{ left: x, top: y, width: stepSize, height: stepSize }}
              title={step.label}
            >
              {String(step.id).padStart(2, "0")}
            </div>
          );
        })}

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-2">
          <p className="font-semibold text-blue-600 text-sm">{currentStep.label}</p>
        </div>
      </div>
    </div>
  );
};

export default CircularStepperMobile;
