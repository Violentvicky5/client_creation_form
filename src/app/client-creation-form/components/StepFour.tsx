"use client";

import useFormValidation from "@/hooks/useFormValidation";
import { AdminInfo } from "@/app/client-creation-form/type/step1form";

type StepFourProps = {
  values: AdminInfo;
  setValues: React.Dispatch<React.SetStateAction<AdminInfo>>;
  onPrevious: () => void;
  onNext: () => void;
  setIsStepFourSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

/* ================= VALIDATION ================= */

const validateStepFour = (values: AdminInfo) => {
  const errors: Partial<Record<keyof AdminInfo, string>> = {};

  if (!values.firstName.trim()) errors.firstName = "First name is required";
  if (!values.lastName.trim()) errors.lastName = "Last name is required";

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default function StepFour({
  values,
  setValues,
  onPrevious,
  onNext,
  setIsStepFourSubmitted,
}: StepFourProps) {
  const { errors, handleChange, handleSubmit } = useFormValidation(
    values,
    setValues,
    validateStepFour
  );

  return (
    <div className="min-h-screen flex justify-center py-6 mt-2">
      <form
        onSubmit={handleSubmit(() => {
          setIsStepFourSubmitted(true); 
          onNext(); 
        })}
        className="w-full max-w-[1200px] bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="mb-2 text-xs font-semibold text-gray-600">
          Create Admin Info
        </h2>

        <hr className="my-3 border-gray-200" />

       <div
  className="
    grid
    gap-1
    grid-cols-1
    min-[426px]:grid-cols-4
  "
>
  {/* First Name */}
  <div className="min-[426px]:col-span-2">
    <FloatingInput
      id="firstName"
      name="firstName"
      label="First Name"
      value={values.firstName}
      onChange={handleChange}
      error={errors.firstName}
    />
  </div>

  {/* Last Name */}
  <div className="min-[426px]:col-span-2">
    <FloatingInput
      id="lastName"
      name="lastName"
      label="Last Name"
      value={values.lastName}
      onChange={handleChange}
      error={errors.lastName}
    />
  </div>

  {/* Phone Number (¼ width) */}
  <div className="min-[426px]:col-span-1">
    <FloatingInput
      id="phone"
      name="phone"
      label="Phone Number"
      value={values.phone}
      onChange={handleChange}
      error={errors.phone}
    />
  </div>

  {/* Email (¾ width) */}
  <div className="min-[426px]:col-span-3">
    <FloatingInput
      id="email"
      name="email"
      label="Email"
      value={values.email}
      onChange={handleChange}
      error={errors.email}
    />
  </div>

  {/* Password */}
  <div className="min-[426px]:col-span-2">
    <FloatingInput
      id="password"
      name="password"
      type="password"
      label="Password"
      value={values.password}
      onChange={handleChange}
      error={errors.password}
    />
  </div>

  {/* Confirm Password */}
  <div className="min-[426px]:col-span-2">
    <FloatingInput
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      label="Confirm Password"
      value={values.confirmPassword}
      onChange={handleChange}
      error={errors.confirmPassword}
    />
  </div>
</div>
   <h2 className="mt-6 text-[9px] font-semibold text-gray-600">
          Important: Ensure Admin Details Before Submit.
        </h2>
        <hr className="mb-6 border-gray-200" />

        

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="w-16 h-7 bg-gray-500 text-white rounded text-xs"
          >
            Previous
          </button>

          <button
            type="submit"
            className="w-20 h-7 bg-blue-700 text-white rounded text-xs"
          >
            Submit
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
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <div className="floating-label">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={error ? "error" : ""}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
    </div>
  );
}
