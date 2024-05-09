import { useSingleInput } from '.';
import { Validations, Validator, Validators } from './types';
import { validateDate, validateFilledValue, validateNumber, validateYear } from './utils/validators';

interface ValidationErrors {
  empty: string;
  number: string;
  year: string;
  date: string;
}

const validators: Validators<keyof ValidationErrors> = {
  empty: validateFilledValue,
  number: validateNumber,
  year: validateYear,
  date: (value: string) => validateDate(value, 'year'),
};

interface UseExpiryDateYearProps {
  initialValue: string;
  validations: Validations;
}

export default function useExpiryDateYear({ initialValue, validations }: UseExpiryDateYearProps) {
  const onChangeValidators: Validator[] = Object.entries(validations.onChange || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const onBlurValidators: Validator[] = Object.entries(validations.onBlur || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const {
    value: year,
    setValue: setYear,
    isValid,
    errorMessage,
    handleChange,
    handleBlur,
  } = useSingleInput({
    initialValue,
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

  return {
    year,
    setYear,
    isValid,
    errorMessage,
    handleChange,
    handleBlur,
  };
}
