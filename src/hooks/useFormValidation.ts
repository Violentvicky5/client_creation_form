import { useState } from "react";

type ValidationFn<T> = (values: T) => Partial<Record<keyof T, string>>;
type PatternFn<T> = Partial<Record<keyof T, RegExp>>;

function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validateFn: ValidationFn<T>,
  patterns?: PatternFn<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    
    if (!isSubmitted) return;

    let validationErrors = validateFn({ ...values, [name]: value });

    if (patterns && value && patterns[name as keyof T]) {
      if (!patterns[name as keyof T]!.test(value)) {
        validationErrors[name as keyof T] = "Invalid format";
      }
    }

    setErrors(validationErrors);
  };

  const handleSubmit =
    (onSuccess: (values: T) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);

      let validationErrors = validateFn(values);

      if (patterns) {
        for (const key in patterns) {
          const pattern = patterns[key as keyof T];
          const value = values[key as keyof T];
          if (pattern && value && !pattern.test(value)) {
            validationErrors[key as keyof T] = "Invalid format";
          }
        }
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        onSuccess(values);
      }
    };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitted(false);
  };

  const getError = (field: keyof T) => (isSubmitted ? errors[field] : undefined);

  return { values, errors, getError, handleChange, handleSubmit, resetForm };
}

export default useFormValidation;
