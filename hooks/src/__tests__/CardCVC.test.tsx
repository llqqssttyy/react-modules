import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CardCVC from '../components/CardCVC';

describe('CardCVC', () => {
  it('초기 상태 확인', () => {
    render(<CardCVC />);
    const cvcInput = screen.getByRole('textbox') as HTMLInputElement;
    const errorMessage = screen.getByText('오류 :');

    expect(cvcInput.value).toBe('');
    expect(errorMessage).toHaveTextContent('오류 :');
  });

  it('입력값이 숫자가 아니면 오류 메세지가 뜬다.', () => {
    render(<CardCVC />);
    const cvcInput = screen.getByTestId('cvc-input') as HTMLInputElement;

    fireEvent.change(cvcInput, { target: { value: 'abc' } });
    fireEvent.blur(cvcInput);

    const errorMessage = screen.getByTestId('cvc-error');

    expect(errorMessage).toHaveTextContent('오류 :숫자만 입력 가능해요.');
  });

  it('입력 길이 초과하면 오류 메세지가 뜬다.', () => {
    render(<CardCVC />);
    const cvcInput = screen.getByTestId('cvc-input') as HTMLInputElement;

    fireEvent.change(cvcInput, { target: { value: '1234' } });
    fireEvent.blur(cvcInput);

    const errorMessage = screen.getByText('오류 :');
    expect(errorMessage).toHaveTextContent('오류 :세자리 숫자');
  });
  it('입력 길이가 3자리 미만이면 오류 메세지가 뜬다.', () => {
    render(<CardCVC />);
    const cvcInput = screen.getByTestId('cvc-input') as HTMLInputElement;

    fireEvent.change(cvcInput, { target: { value: '12' } });
    fireEvent.blur(cvcInput);

    const errorMessage = screen.getByTestId('cvc-error');
    expect(errorMessage).toHaveTextContent('오류 :세자리 숫자');
  });

  it('유효한 입력값일 경우 오류 메세지가 없다.', () => {
    render(<CardCVC />);
    const cvcInput = screen.getByTestId('cvc-input') as HTMLInputElement;

    fireEvent.change(cvcInput, { target: { value: '123' } });
    fireEvent.blur(cvcInput);

    const errorMessage = screen.getByTestId('cvc-error');
    expect(errorMessage).toHaveTextContent('오류:');
  });
});
