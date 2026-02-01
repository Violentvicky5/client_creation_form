"use client";

import { useState, useEffect } from "react";
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
       products: [], // to store selected products

          subscription_settings: {
      billingCycle: "",
      trialDays: "",
      region: "",
    },        // subscription settings
    admin_info: {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
},

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
            setCurrentStep(2);
            setMaxReachedStep(2);
          }}
        />
      )}
{currentStep === 2 && (
  <StepTwoPage
    selectedProducts={companyFormValues.products}
    setSelectedProducts={(products) =>
      setCompanyFormValues((prev) => ({
        ...prev,
        products,
      }))
    }
    onPrevious={() => setCurrentStep(1)}
    onNext={() => {
      setCurrentStep(3);
      setMaxReachedStep(3);
    }}
  />
)}


     {currentStep === 3 && (
  <StepThree
    values={companyFormValues.subscription_settings}
    setValues={(subscription_settings) =>
      setCompanyFormValues((prev) => ({
        ...prev,
        subscription_settings,
      }))
    }
    onPrevious={() => setCurrentStep(2)}
    onNext={() => {
      
      setCurrentStep(4);
      setMaxReachedStep(4);
    }}
  />
)}


    {currentStep === 4 && (
  <StepFour
    values={companyFormValues.admin_info}
    setValues={setCompanyFormValues}
    onPrevious={() => setCurrentStep(3)}
    onNext={() => {
      console.log("FINAL SUBMIT:", companyFormValues);
      // submit API call here
    }}
  />
)}

    </>
  );
}
