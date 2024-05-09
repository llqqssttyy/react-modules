import { useState } from 'react';
import { ErrorMessage, ValidationRules } from './types';
import useValidation from './useValidation';

interface UseSingleInputProps {
  initialValue: string;
  validations: ValidationRules;
}

/**
 * 하나의 입력을 관리하기 위한 사용자 정의 훅입니다.
 *
 * @param {string} initialValue - 입력의 초기값을 나타내는 문자열입니다.
 * @param {Object} validations - 검증 함수 배열을 포함하는 객체입니다.
 * @param {Validator[]} validations.onChange - 입력 변경 시 적용될 선택적 검증 함수 배열입니다.
 * @param {Validator[]} validations.onBlur - 입력 포커스 이탈 시 적용될 선택적 검증 함수 배열입니다.
 *
 * @template E - 이벤트 핸들러가 부착될 DOM 요소의 유형입니다.
 *
 * @returns {string} value - 현재 값입니다.
 * @returns {React.Dispatch<React.SetStateAction<string>>} setValue - value에 대한 set 함수입니다.
 * @returns {boolean} isValid - 현재 검증 상태입니다.
 * @returns {string | null} errorMessage - 최근 검증 실패로 인한 현재 에러 메시지입니다.
 * @returns {Function} onChange - 입력 변경 이벤트에 대한 이벤트 핸들러로, onChange 검증기를 기반으로 검증 상태를 업데이트합니다.
 * @returns {Function} onBlur - 입력 포커스 이탈 이벤트에 대한 이벤트 핸들러로, onBlur 검증기를 기반으로 검증 상태를 업데이트합니다.
 */
export default function useSingleInput({ initialValue, validations }: UseSingleInputProps) {
  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

  const { validate: validateOnChange } = useValidation({ validators: validations.onChange ?? null });
  const { validate: validateOnBlur } = useValidation({ validators: validations.onBlur ?? null });

  const handleChange = (inputValue: string) => {
    if (!validateOnChange) {
      setValue(inputValue);
      return;
    }

    const result = validateOnChange(inputValue);

    if (result.isValid) {
      setValue(inputValue);
    }
    setErrorMessage(result.errorMessage);
  };

  const handleBlur = () => {
    if (!validateOnBlur) return;

    const { errorMessage } = validateOnBlur(value);
    setErrorMessage(errorMessage);
  };

  return {
    value,
    setValue,
    isValid: !errorMessage,
    errorMessage,
    setErrorMessage,
    handleChange,
    handleBlur,
  };
}
