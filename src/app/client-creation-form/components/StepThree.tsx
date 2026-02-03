'use client';

import { useEffect, useState, useRef } from 'react';
import useFormValidation from '@/hooks/useFormValidation';
import { CompanyFormValues } from '@/app/client-creation-form/type/step1form';

/* ---------------- Types ---------------- */

type SubscriptionSettings =
  CompanyFormValues['subscription_settings'];

type StepThreeProps = {
  values: SubscriptionSettings;
  setValues: (values: SubscriptionSettings) => void;
  onNext: () => void;
  onPrevious: () => void;
};

/* ---------------- Validation ---------------- */

const validateStepThree = (values: SubscriptionSettings) => {
  const errors: Partial<Record<keyof SubscriptionSettings, string>> = {};

  if (!values.billingCycle)
    errors.billingCycle = 'Billing cycle is required';
  if (!values.trialDays)
    errors.trialDays = 'Trial days is required';
  if (!values.region)
    errors.region = 'Region is required';

  return errors;
};

/* ---------------- Component ---------------- */

export default function StepThree({
  values,
  setValues,
  onNext,
  onPrevious,
}: StepThreeProps) {
  const [localValues, setLocalValues] =
    useState<SubscriptionSettings>(values);

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const { errors, handleChange, handleSubmit } =
    useFormValidation<SubscriptionSettings>(
      localValues,
      setLocalValues,
      validateStepThree
    );

  return (
    <div className="min-h-screen flex justify-center py-6 mt-2">
      <form
        onSubmit={handleSubmit(() => {
          setValues(localValues);
          onNext();
        })}
        className="w-full max-w-[1200px] bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md"
      >
        <h2 className="mb-2 text-xs font-semibold text-gray-600">
          Subscription Settings
        </h2>
        <hr className="my-3 border-gray-200" />

        <div className="mb-10 text-sm text-gray-600">
          <div
            className="
              grid gap-2
              grid-cols-1
              min-[475px]:grid-cols-2
              min-[768px]:grid-cols-3
              min-[1024px]:grid-cols-3
              min-[1280px]:grid-cols-3
            "
          >
            <FloatingSelect
              id="billingCycle"
              name="billingCycle"
              label="Billing Cycle"
              value={localValues.billingCycle}
              onChange={handleChange}
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Quarterly', value: 'quarterly' },
                { label: 'Half Yearly', value: 'half-yearly' },
                { label: 'Annually', value: 'annually' },
              ]}
              error={errors.billingCycle}
            />

            <FloatingSelect
              id="trialDays"
              name="trialDays"
              label="Trial Days"
              value={localValues.trialDays}
              onChange={handleChange}
              options={Array.from({ length: 30 }, (_, i) => ({
                label: `${i + 1} Days`,
                value: String(i + 1),
              }))}
              error={errors.trialDays}
            />

            <FloatingSelect
              id="region"
              name="region"
              label="Region"
              value={localValues.region}
              onChange={handleChange}
              options={[
                { label: 'India', value: 'india' },
                { label: 'United States', value: 'usa' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Germany', value: 'germany' },
                { label: 'Australia', value: 'australia' },
              ]}
              error={errors.region}
            />
          </div>
        </div>

        <h2 className="text-[9px] font-semibold text-gray-600">
          Important: Ensure Subscription Details Before Move to Next Step
        </h2>
        <hr className="mb-6 border-gray-200" />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="w-16 h-7 py-1.5 bg-gray-500 text-white rounded text-xs hover:bg-gray-400 transition"
          >
            Previous
          </button>

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

/* ---------------- Floating Select (custom dropdown with fixed height) ---------------- */

function FloatingSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  name: keyof SubscriptionSettings;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options: { label: string; value: string }[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? '';

  return (
    <div>
      <div className="floating-label relative text-sm">
        {/* Hidden input to drive floating label and validation */}
        <input
          ref={hiddenInputRef}
          type="text"
          name={name}
          value={value}
          placeholder=" "
          readOnly
          className={`absolute inset-0 w-full opacity-0 pointer-events-none ${
            error ? 'error' : ''
          }`}
        />

        {/* Visible dropdown */}
      <div
  id={id}
  tabIndex={0}
  onClick={() => setOpen((p) => !p)}
  onFocus={() => hiddenInputRef.current?.focus()}
  className={`w-full px-2 py-1.5 text-xs border rounded bg-white cursor-pointer
    ${error ? 'border-red-500' : value ? 'border-blue-500' : 'border-gray-300'}
    focus:ring-1 focus:ring-blue-500 focus:border-blue-500
  `}
>

          {selectedLabel || '\u00A0'}
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
            ▼
          </span>
        </div>

        {/* Scrollable dropdown options */}
        {open && (
          <ul className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-25 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt.value}
                className="px-2 py-1 text-xs cursor-pointer hover:bg-blue-50"
                onClick={() => {
                  onChange({
                    target: { name, value: opt.value },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}

        {/* Floating label */}
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
