import { useCardNumbers } from '../lib';

export default function CardNumbers() {
  const { cardNumbers, onChange, onBlur, formatCardNumber, errorMessage } = useCardNumbers({
    initialValue: '',
    validations: {
      onChange: {
        number: '숫자만 사용 가능해요.',
      },
      onBlur: {
        empty: '카드 번호를 입력해주세요.',
      },
    },
  });

  return (
    <div>
      <h3>Card Number</h3>
      <input maxLength={19} value={formatCardNumber(cardNumbers)} type="text" onChange={onChange} onBlur={onBlur} />
      <div>오류:{errorMessage}</div>
    </div>
  );
}
