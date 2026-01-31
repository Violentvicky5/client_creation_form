"use client";

import { useState } from "react";
import HorizontalStepProgress from "./components/HorizontalStepProgress";
import CompanyFormPage from "./components/CompanyFormPage";
import StepTwoPage from "./components/StepTwoPage";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

export default function ClientCreationFormPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <>
      {/* Stepper */}
      <HorizontalStepProgress currentStep={currentStep} />

      {/* Step content */}
      {currentStep === 1 && (
        <CompanyFormPage onNext={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <StepTwoPage
          onPrevious={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          onPrevious={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
        />
      )}
      {currentStep === 4 && <StepFour onPrevious={() => setCurrentStep(3)} />}
    </>
  );
}
