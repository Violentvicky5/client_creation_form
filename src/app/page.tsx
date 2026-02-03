"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CircularStepProgress from "./client-creation-form/components/CircularStepsProgress";
const Page = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/client-creation-form");
  };
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)

  return (
    <div className="flex  gap-6 justify-center items-center min-h-screen">
   <CircularStepProgress currentStep={currentStep} />

      <button
        type="button"
        onClick={handleRoute}
        className=" w-25 h-12.5 bg-blue-500 text-white rounded text-xs"
      >
        Create client
      </button>
    </div>
  );
};

export default Page;
