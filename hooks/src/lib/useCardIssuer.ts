import { ChangeEventHandler } from 'react';
import { useSingleInput } from '.';
import { Validations, Validator, ValidatorFunction } from './types';
import { validateFilledValue } from './utils/validators';

interface ValidationErrors {
  empty: string;
}

interface UseCardIssuerProps {
  initialValue: string;
  validations: Validations;
}

const validators: Record<keyof ValidationErrors, ValidatorFunction> = {
  empty: validateFilledValue,
};

export default function useCardIssuer({ initialValue, validations }: UseCardIssuerProps) {
  const onChangeValidators: Validator[] = Object.entries(validations.onChange || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const onBlurValidators: Validator[] = Object.entries(validations.onBlur || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const {
    value: cardIssuer,
    setValue: setCardIssuer,
    isValid,
    errorMessage,
    handleChange,
    handleBlur,
  } = useSingleInput({
    initialValue,
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    handleChange(value);
  };

  return {
    cardIssuer,
    setCardIssuer,
    isValid,
    errorMessage,
    validators: [...onChangeValidators, ...onBlurValidators],
    onChange,
    onBlur: handleBlur,
  };
}
