import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardNumbers } from '../components';

describe('CardNumbers', () => {
  it('초기 상태 확인', () => {
    render(<CardNumbers />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    expect(input).toHaveValue('');
    expect(errorMessage).toHaveTextContent('오류:');
  });

  test.each(['%', 'a'])('카드 번호는 숫자가 아닌 문자를 입력할 수 없다. - "%s"', (invalidInput) => {
    render(<CardNumbers />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    fireEvent.change(input, { target: { value: invalidInput } });

    expect(input).toHaveTextContent('');
    expect(errorMessage).toHaveTextContent('숫자만 사용 가능해요.');
  });

  test.each([
    ['visa', 16, '4'],
    ['master', 16, '51'],
    ['diners', 14, '36'],
    ['amex', 15, '34'],
    ['union', 16, '622126'],
    ['etc', 16, '1234'],
  ])('%s는 %d자리가 입력되지 않으면 에러 문구를 보여준다.', (_, count, value) => {
    render(<CardNumbers />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);

    expect(errorMessage).toHaveTextContent(`${count}자리를 입력해 주세요.`);
  });

  it('카드 번호는 반드시 입력되어야 한다.', () => {
    render(<CardNumbers />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('오류:');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(errorMessage).toHaveTextContent('카드 번호를 입력해주세요.');
  });

  test.each([
    ['visa', [4, 4, 4, 4], '4111 1111 1111 1111'],
    ['master', [4, 4, 4, 4], '5111 1111 1111 1111'],
    ['diners', [4, 6, 4], '3611 111111 1111'],
    ['amex', [4, 6, 5], '3411 111111 11111'],
    ['union', [4, 4, 4, 4], '6221 2611 1111 1111'],
    ['etc', [4, 4, 4, 4], '1111 1111 1111 1111'],
  ])('%s는 %s자리로 포맷팅되어야 한다.', (_, __, formattedValue) => {
    render(<CardNumbers />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: formattedValue.split(' ').join('') } });

    expect(input).toHaveValue(formattedValue);
  });
});
