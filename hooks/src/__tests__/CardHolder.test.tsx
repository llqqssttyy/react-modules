import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardHolder } from '../components';

describe('CardHolder', () => {
  it('초기 상태 확인', () => {
    render(<CardHolder />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    expect(input).toHaveValue('');
    expect(errorMessage).toHaveTextContent('오류:');
  });

  it('카드 소유자 이름은 알파벳이 아닌 문자를 입력할 수 없다.', () => {
    const invalidInputs = ['%!', '123', '바다와 렛서'];

    test.each(invalidInputs)('입력 값 "%s"는 유효하지 않다', (invalidInput) => {
      render(<CardHolder />);
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('오류:');

      fireEvent.change(input, { target: { value: invalidInput } });

      expect(errorMessage).toHaveTextContent('숫자만 입력가능해요.');
    });
  });

  it('카드 소유자 이름은 반드시 입력되어야 한다.', () => {
    render(<CardHolder />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(errorMessage).toHaveTextContent('소유자 이름을 입력해주세요.');
  });

  it('input에 유효한 값을 입력할 수 있다.', () => {
    render(<CardHolder />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'JOHN DOE' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('JOHN DOE');
  });
});
