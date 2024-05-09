import { ChangeEventHandler } from 'react';
import { useSingleInput } from '.';
import { VALID_LENGTH } from './constants';
import { Validations, Validator, ValidatorFunction } from './types';
import { validateFilledValue, validateLength, validateNumber } from './utils/validators';

interface ValidationErrors {
  empty: string;
  number: string;
  length: string;
}

const validators: Record<keyof ValidationErrors, ValidatorFunction> = {
  empty: validateFilledValue,
  number: validateNumber,
  length: (value: string) => validateLength(value, VALID_LENGTH.cvc),
};

interface UseCVCProps {
  initialValue: string;
  validations: Validations;
}

/**
 * CVC 입력값을 관리하고 유효성 검사를 수행하는 커스텀 훅입니다.
 *
 * @param {string} initialValue - CVC 입력 필드의 초기값입니다.
 * @param {Validations} validations - 입력값의 유효성 검사를 위한 검증 규칙을 담고 있는 객체입니다.
 * @param {Validator[]} validations.onChange - 입력 변경 시 적용될 선택적 검증 함수 배열입니다.
 * @param {Validator[]} validations.onBlur - 입력 포커스 이탈 시 적용될 선택적 검증 함수 배열입니다.
 *
 * @returns {Object} 입력 필드의 상태와 이벤트 핸들러를 포함한 객체입니다.
 * @returns {string} cvc - 현재 CVC 입력 필드의 값입니다.
 * @returns {Function} setCVC - 입력 필드의 값을 설정하는 함수입니다.
 * @returns {boolean} isValid - 현재 검증 상태입니다.
 * @returns {string | null} errorMessage - 최근 검증 실패로 인한 현재 에러 메시지입니다.
 * @returns {Function} handleChange - 입력 변경 이벤트에 대한 이벤트 핸들러로, onChange 검증기를 기반으로 검증 상태를 업데이트합니다.
 * @returns {Function} handleBlur - 입력 포커스 이탈 이벤트에 대한 이벤트 핸들러로, onBlur 검증기를 기반으로 검증 상태를 업데이트합니다.
 */
export default function useCVC({ initialValue, validations }: UseCVCProps) {
  const onChangeValidators: Validator[] = Object.entries(validations.onChange || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const onBlurValidators: Validator[] = Object.entries(validations.onBlur || {}).map(([key, errorMessage]) => ({
    test: validators[key as keyof ValidationErrors],
    errorMessage,
  }));

  const {
    value: cvc,
    setValue: setCVC,
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
    cvc,
    setCVC,
    isValid,
    errorMessage,
    validators: [...onChangeValidators, ...onBlurValidators],
    onChange,
    onBlur: handleBlur,
  };
}
