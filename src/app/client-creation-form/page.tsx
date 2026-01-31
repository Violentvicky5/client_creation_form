"use client";

import { useState } from "react";
import HorizontalStepProgress from "./components/HorizontalStepProgress";
import CompanyFormPage from "./components/CompanyFormPage";
import StepTwoPage from "./components/StepTwoPage";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import { CompanyFormValues } from "@/app/client-creation-form/type/step1form";

export default function ClientCreationFormPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<1 | 2 | 3 | 4>(1);
  const [companyFormValues, setCompanyFormValues] =
    useState<CompanyFormValues>({
      companyName: "",
      companyNumber: "",
      deptName: "",
      StreetAddress: "",
      City: "",
      State: "",
      zipCode: "",
      country: "",
    });

  return (
    <>
      <HorizontalStepProgress
        currentStep={currentStep}
        maxReachedStep={maxReachedStep}
        onStepChange={setCurrentStep}
      />

      {currentStep === 1 && (
        <CompanyFormPage
          values={companyFormValues}
          setValues={setCompanyFormValues}
          onNext={() => {
            console.log("STEP 1 VALUES:", companyFormValues);  //acess the values entered here
            setCurrentStep(2);
            setMaxReachedStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <StepTwoPage
          onPrevious={() => setCurrentStep(1)}
          onNext={() => {
            setCurrentStep(3);
            setMaxReachedStep(3);
          }}
        />
      )}

      {currentStep === 3 && (
        <StepThree
          onPrevious={() => setCurrentStep(2)}
          onNext={() => {
            setCurrentStep(4);
            setMaxReachedStep(4);
          }}
        />
      )}

      {currentStep === 4 && (
        <StepFour onPrevious={() => setCurrentStep(3)} />
      )}
    </>
  );
}
