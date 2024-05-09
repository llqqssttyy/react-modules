import { usePassword } from '../lib';

export default function CardPassword() {
  const passwordResult = usePassword({
    initialValue: '',
    validations: {
      onChange: {
        number: '숫자만 입력가능해요.',
      },
      onBlur: {
        empty: '비밀번호를 입력해 주세요.',
        length: '2자리만 입력가능해요.',
      },
    },
  });

  return (
    <div>
      <h3>card password</h3>
      <input
        value={passwordResult.password}
        type="password"
        maxLength={2}
        onBlur={passwordResult.onBlur}
        onChange={passwordResult.onChange}
      />
      <div>오류 :{passwordResult.errorMessage}</div>
    </div>
  );
}
