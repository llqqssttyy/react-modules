import { useCVC } from '../lib';

export default function CardCVC() {
  const cvcResult = useCVC({
    initialValue: '',
    validations: {
      onChange: {
        number: '숫자만 입력 가능해요.',
      },
      onBlur: {
        empty: '값을 입력해주세요.',
        length: '세자리 숫자여야 합니다.',
      },
    },
  });

  return (
    <div>
      <h3>card cvc</h3>
      <input
        value={cvcResult.cvc}
        type="text"
        data-testid="cvc-input"
        maxLength={3}
        onBlur={cvcResult.onBlur}
        onChange={cvcResult.onChange}
      />
      <div data-testid="cvc-error">오류 :{cvcResult.errorMessage}</div>
    </div>
  );
}
