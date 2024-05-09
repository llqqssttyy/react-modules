import { ChangeEventHandler } from 'react';
import { useSingleInput } from '.';
import { VALID_LENGTH } from './constants';
import { Validations, Validator, Validators } from './types';
import { validateFilledValue, validateLength, validateNumber } from './utils/validators';

interface ValidationErrors {
  empty: string;
  number: string;
  length: string;
}

interface UsePasswordProps {
  initialValue: string;
  validations: Validations;
}

const validators: Validators<keyof ValidationErrors> = {
  number: validateNumber,
  empty: validateFilledValue,
  length: (value: string) => validateLength(value, VALID_LENGTH.password),
};

export default function usePassword({ initialValue, validations }: UsePasswordProps) {
  const onChangeValidators: Validator[] = Object.entries(validations.onChange || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const onBlurValidators: Validator[] = Object.entries(validations.onBlur || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const {
    value: password,
    setValue: setPassword,
    isValid,
    errorMessage,
    handleChange,
    handleBlur,
  } = useSingleInput({
    initialValue,
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    handleChange(value);
  };

  return {
    password,
    setPassword,
    isValid,
    errorMessage,
    validators: [...onChangeValidators, ...onBlurValidators],
    onChange,
    onBlur: handleBlur,
  };
}
