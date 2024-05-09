import { useSingleInput } from '.';
import { Validations, Validator, Validators } from './types';
import { validateDate, validateFilledValue, validateMonth, validateNumber } from './utils/validators';

interface ValidationErrors {
  empty: string;
  number: string;
  month: string;
  date: string;
}

const validators: Validators<keyof ValidationErrors> = {
  empty: validateFilledValue,
  number: validateNumber,
  month: validateMonth,
  date: (value: string) => validateDate(value, 'month'),
};

interface UseExpiryDateMonthProps {
  initialValue: string;
  validations: Validations;
}

export default function useExpiryDateMonth({ initialValue, validations }: UseExpiryDateMonthProps) {
  const onChangeValidators: Validator[] = Object.entries(validations.onChange || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const onBlurValidators: Validator[] = Object.entries(validations.onBlur || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const {
    value: month,
    setValue: setMonth,
    isValid,
    errorMessage,
    handleChange,
    handleBlur,
  } = useSingleInput({
    initialValue,
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

  return {
    month,
    setMonth,
    isValid,
    errorMessage,
    handleChange,
    handleBlur,
  };
}
