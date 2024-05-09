import { useExpiryDate } from '../lib';

export default function CardExpiryDate() {
  const { expiryDate, onChange, onBlur, errorMessage } = useExpiryDate({
    initialValues: {
      month: '',
      year: '',
    },
    validations: {
      month: {
        onChange: {
          number: '숫자를 입력해 주세요.',
        },
        onBlur: {
          empty: '달을 입력해 주세요.',
          month: '유효하지 않은 달입니다.',
          date: '유효기간이 만료된 카드는 사용할 수 없습니다.',
        },
      },
      year: {
        onChange: {
          number: '숫자를 입력해 주세요.',
        },
        onBlur: {
          empty: '년도를 입력해 주세요.',
          year: '유효하지 않은 연도입니다.',
          date: '유효기간이 만료된 카드는 사용할 수 없습니다.',
        },
      },
    },
  });

  return (
    <div>
      <input maxLength={2} name="month" value={expiryDate.month} type="text" onChange={onChange} onBlur={onBlur} />
      <input maxLength={2} name="year" value={expiryDate.year} type="text" onChange={onChange} onBlur={onBlur} />
      <div>오류:{errorMessage}</div>
    </div>
  );
}
