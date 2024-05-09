import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardPassword } from '../components';

describe('CardPassword', () => {
  it('초기 상태 확인', () => {
    render(<CardPassword />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    expect(input).toHaveValue('');
    expect(errorMessage).toHaveTextContent('오류:');
  });

  it('비밀번호로 숫자가 아닌 문자는 입력할 수 없다.', () => {
    const invalidInputs = ['ab', '*', '1a', '%!'];

    test.each(invalidInputs)('입력 값 "%s"는 유효하지 않다', (invalidInput) => {
      render(<CardPassword />);
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('오류:');

      fireEvent.change(input, { target: { value: invalidInput } });

      expect(errorMessage).toHaveTextContent('숫자만 입력가능해요.');
    });
  });

  it('비밀번호는 2자리로 입력되어야 한다.', () => {
    render(<CardPassword />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.blur(input);

    expect(errorMessage).toHaveTextContent('2자리만 입력가능해요.');
  });

  it('비밀번호는 반드시 입력되어야 한다.', () => {
    render(<CardPassword />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(errorMessage).toHaveTextContent('비밀번호를 입력해 주세요.');
  });

  it('비밀번호 input에 유효한 값을 입력할 수 있다.', () => {
    render(<CardPassword />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('12');
  });
});
