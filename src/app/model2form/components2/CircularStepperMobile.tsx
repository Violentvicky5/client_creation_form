"use client"; // 🔥 MUST be the first line

import React from "react";
import { HiChevronRight, HiX, HiCheck } from "react-icons/hi";
import { Tooltip as ReactTooltip } from "react-tooltip";

type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  id: number;
  label: string;
  status: StepStatus;
}

const steps: Step[] = [
  { id: 1, label: "Company Info", status: "complete" },
  { id: 2, label: "Products", status: "complete" },
  { id: 3, label: "Subscription Plan", status: "complete" },
  { id: 4, label: "Admin Creation", status: "current" },
  { id: 5, label: "Completed", status: "upcoming" },
];

const CircularStepperMobile = () => {
  const diameter = 120;
  const radius = diameter / 2;
  const center = radius;
  const totalSteps = steps.length;
  const stepSize = 28;
  const chevronSize = 17;

  const currentStep = steps.find((s) => s.status === "current") || steps[0];
  const completedStepsArray = steps.filter((s) => s.status === "complete");
  const completedSteps = completedStepsArray.map((s) => s.label).join(", ");
  const completedCount = completedStepsArray.length;

  let progressPercent = 0;
  if (completedCount === 1) progressPercent = 25;
  else if (completedCount === 2) progressPercent = 50;
  else if (completedCount === 3) progressPercent = 75;
  else if (completedCount === 4) progressPercent = 100;

  return (
    <div className="block md:hidden p-4">
      <div className="relative flex bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden px-5 py-5">
        <HiX
          className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
          size={15}
        />

        <div
          className="relative flex-shrink-0 p-4"
          style={{ width: diameter, height: diameter }}
        >
          <div className="absolute inset-0 rounded-full border-1 border-gray-300"></div>

          {steps.map((step, index) => {
            const angle = (index / totalSteps) * 2 * Math.PI - Math.PI / 2;
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
                data-tooltip-id={`step-tooltip-${step.id}`}
                data-tooltip-content={step.label}
              >
                {String(step.id).padStart(2, "0")}
              </div>
            );
          })}

          {steps.map((_, index) => {
            const nextIndex = index + 1;
            const angle1 = (index / totalSteps) * 2 * Math.PI - Math.PI / 2;
            const angle2 =
              nextIndex < totalSteps
                ? (nextIndex / totalSteps) * 2 * Math.PI - Math.PI / 2
                : angle1 + (2 * Math.PI) / totalSteps;
            const midAngle = (angle1 + angle2) / 2;

            const chevronRadius = radius - 1;
            const chevronCenterX = center + chevronRadius * Math.cos(midAngle);
            const chevronCenterY = center + chevronRadius * Math.sin(midAngle);

            const rotationDeg = (midAngle + Math.PI / 2) * (180 / Math.PI);

            return (
              <HiChevronRight
                key={`chevron-${index}`}
                className="absolute text-gray-400"
                size={chevronSize}
                style={{
                  left: chevronCenterX - chevronSize / 2,
                  top: chevronCenterY - chevronSize / 2,
                  transform: `rotate(${rotationDeg}deg)`,
                }}
              />
            );
          })}

          <div
            className="absolute w-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       text-center px-1 border border-gray-300 rounded shadow-md
                       flex items-center justify-center"
            data-tooltip-id="center-tooltip"
            data-tooltip-content={
              currentStep.label === "Completed"
                ? "All steps completed"
                : `${completedCount} steps completed`
            }
          >
            {currentStep.label === "Completed" ? (
              <HiCheck className="text-emerald-600 w-4 h-4" />
            ) : (
              <p className="font-semibold text-[8px]">
                {progressPercent ? `Completed ${progressPercent}%` : "Client Creation"}
              </p>
            )}
          </div>

          <ReactTooltip
            id="center-tooltip"
            place="top"
          
            className="bg-black text-white text-[8px] px-2 py-1 rounded shadow-lg"
          />
          {steps.map((step) => (
            <ReactTooltip
              key={step.id}
              id={`step-tooltip-${step.id}`}
              place="top"
            
              className="bg-black text-white text-[8px] px-2 py-1 rounded shadow-lg"
            />
          ))}
        </div>

        <div className="mx-5 w-px bg-gray-300 self-stretch"></div>

        <div className="bg-emerald-50 rounded-2xl p-2 w-full flex">
          <table className="table-auto text-left border-collapse w-full">
            <tbody>
              <tr>
                <td className="pr-2 p-1 font-semibold text-[10px] text-gray-700">
                  Completed Step:
                </td>
                <td className="text-blue-600 text-[8px]">{completedSteps}</td>
              </tr>
              <tr>
                <td className="pr-2 p-1 font-semibold text-[10px] text-gray-700">
                  Current Step:
                </td>
                <td className="text-blue-600 text-[8px]">{currentStep.label}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CircularStepperMobile;
