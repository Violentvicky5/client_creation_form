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
  const [isStepFourSubmitted, setIsStepFourSubmitted] = useState(false);

  const [companyFormValues, setCompanyFormValues] =
    useState<CompanyFormValues>({
      company_info: {
        companyName: "",
        companyNumber: "",
        deptName: "",
        StreetAddress: "",
        City: "",
        State: "",
        zipCode: "",
        country: "",
      },
      products: [],
      subscription_settings: {
        billingCycle: "",
        trialDays: "",
        region: "",
      },
      admin_info: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

  // FINAL SUBMIT (Step 4)
  const handleFinalSubmit = () => {
    console.log("FINAL CLIENT DATA:", companyFormValues);
    setIsStepFourSubmitted(true); // turns step 4 circle blue
  };

  return (
    <>
      <HorizontalStepProgress
        currentStep={currentStep}
        maxReachedStep={maxReachedStep}
        onStepChange={setCurrentStep}
        isStepFourSubmitted={isStepFourSubmitted}
      />

      {currentStep === 1 && (
        <CompanyFormPage
          values={companyFormValues.company_info}
          setValues={(company_info) =>
            setCompanyFormValues((prev) => ({
              ...prev,
              company_info:
                typeof company_info === "function"
                  ? company_info(prev.company_info)
                  : company_info,
            }))
          }
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
    setValues={(admin_info) =>
      setCompanyFormValues((prev) => ({
        ...prev,
        admin_info:
          typeof admin_info === "function"
            ? admin_info(prev.admin_info)
            : admin_info,
      }))
    }
    onPrevious={() => setCurrentStep(3)}
    setIsStepFourSubmitted={setIsStepFourSubmitted}
    onNext={() => {
      // ✅ FINAL DATA ACCESS HERE
      console.log("FINAL CLIENT DATA:", companyFormValues);

      // mark step 4 as completed (circle turns blue)
      setIsStepFourSubmitted(true);
    }}
  />
)}

    </>
  );
}
