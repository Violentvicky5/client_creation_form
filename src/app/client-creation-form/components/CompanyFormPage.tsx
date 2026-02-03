"use client";

import useFormValidation from "@/hooks/useFormValidation";
import { CompanyFormValues } from "@/app/client-creation-form/type/step1form";



type Props = {
  values: CompanyFormValues["company_info"];
  setValues: React.Dispatch<
    React.SetStateAction<CompanyFormValues["company_info"]>
  >;
  onNext: () => void;
};



const patterns = {
  companyName: /^[A-Za-z\s]{5,}$/,
  deptName: /^[A-Za-z\s]{2,}$/,
  StreetAddress: /^[A-Za-z0-9\s,.-]+$/,
  City: /^[A-Za-z\s]{2,}$/,
  State: /^[A-Za-z\s]{2,}$/,
  country: /^[A-Za-z\s]{2,}$/,
  zipCode: /^\d{6}$/,
  companyNumber: /^\d{10}$/,
};

/*VALIDATION*/

const validateCompanyForm = (
  values: CompanyFormValues["company_info"]
) => {
  const errors: Partial<
    Record<keyof CompanyFormValues["company_info"], string>
  > = {};

  if (!values.companyName) errors.companyName = "Company Name is required";
  if (!values.companyNumber)
    errors.companyNumber = "Company Number is required";
  if (!values.deptName) errors.deptName = "Department Name is required";
  if (!values.StreetAddress)
    errors.StreetAddress = "Street Address is required";
  if (!values.City) errors.City = "City is required";
  if (!values.State) errors.State = "State is required";
  if (!values.zipCode) errors.zipCode = "Zip Code is required";
  if (!values.country) errors.country = "Country is required";

  return errors;
};

/* COMPONENT  */

export default function CompanyFormPage({
  values,
  setValues,
  onNext,
}: Props) {
  const { errors, handleChange, handleSubmit } =
    useFormValidation<
      CompanyFormValues["company_info"]
    >(values, setValues, validateCompanyForm, patterns);

  return (
    <div className="flex justify-center py-2">
      <form
        onSubmit={handleSubmit(() => onNext())}
        className="w-full max-w-[900px] bg-white p-4 rounded-md shadow-sm"
      >
        {/* Company Info */}
        <div className="mb-3">
          <h2 className="mb-2 text-xs font-semibold text-gray-600">
            Company Information
          </h2>
          <hr className="my-3 border-gray-200" />
          <div className="grid grid-cols-1 gap-3">
            <div className="col-span-1">
              <FloatingInput
                id="companyName"
                name="companyName"
                label="Company Name"
                value={values.companyName}
                onChange={handleChange}
                error={errors.companyName}
              />
            </div>

            <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-3">
              <FloatingInput
                id="companyNumber"
                name="companyNumber"
                label="Company Number"
                type="number"
                value={values.companyNumber}
                onChange={handleChange}
                error={errors.companyNumber}
              />

              <FloatingInput
                id="deptName"
                name="deptName"
                label="Department Name"
                value={values.deptName}
                onChange={handleChange}
                error={errors.deptName}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-3 mt-6">
          <h2 className="mb-2 text-xs font-semibold text-gray-600">Address</h2>
          <hr className="my-3 border-gray-200" />
          <div className="grid grid-cols-1 gap-3">
            <div className="col-span-1">
              <FloatingInput
                id="StreetAddress"
                name="StreetAddress"
                label="Street Address"
                value={values.StreetAddress}
                onChange={handleChange}
                error={errors.StreetAddress}
              />
            </div>

            <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-3">
              <FloatingInput
                id="City"
                name="City"
                label="City"
                value={values.City}
                onChange={handleChange}
                error={errors.City}
              />

              <FloatingInput
                id="State"
                name="State"
                label="State"
                value={values.State}
                onChange={handleChange}
                error={errors.State}
              />

              <FloatingInput
                id="zipCode"
                name="zipCode"
                label="Zip Code"
                type="number"
                value={values.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
              />

              <FloatingInput
                id="country"
                name="country"
                label="Country"
                value={values.country}
                onChange={handleChange}
                error={errors.country}
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="w-16 h-7 py-1.5 bg-blue-700 text-white rounded text-xs hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= FLOATING INPUT ================= */

function FloatingInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="floating-label relative text-sm">
        <input
          type={type}
          id={id}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none ${
            error
              ? "error"
              : "focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        <label
          htmlFor={id}
          className="absolute left-2 top-1 text-gray-500 text-[10px] transition-all duration-200 pointer-events-none"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
    </div>
  );
}
