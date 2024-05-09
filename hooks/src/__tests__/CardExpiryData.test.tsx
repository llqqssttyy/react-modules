import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CardExpiryDate from '../components/CardExpiryDate';

describe('CardExpiryDate', () => {
  it('초기 상태 확인', () => {
    render(<CardExpiryDate />);
    const monthInput = screen.getByRole('textbox', { name: 'false' });
    const yearInput = screen.getByRole('textbox', { name: 'false' });
    const errorMessage = screen.getByText('오류:');

    expect(monthInput).toHaveValue('');
    expect(yearInput).toHaveValue('');
    expect(errorMessage).toHaveTextContent('오류:');
  });

  it('입력값이 숫자가 아닌 경우 오류 메세지가 뜬다', () => {
    render(<CardExpiryDate />);
    const monthInput = screen.getByRole('textbox', { name: 'false' });

    fireEvent.change(monthInput, { target: { value: 'ab' } });
    fireEvent.blur(monthInput);

    const errorMessage = screen.getByText('오류:');
    expect(errorMessage).toHaveTextContent('오류:숫자를 입력해 주세요.');
  });
  it('유효하지 않은 달일 경우 오류 메세지가 뜬다', () => {
    render(<CardExpiryDate />);
    const monthInput = screen.getByRole('textbox', { name: 'false' });

    fireEvent.change(monthInput, { target: { value: '13' } });
    fireEvent.blur(monthInput);

    const errorMessage = screen.getByText('오류:');
    expect(errorMessage).toHaveTextContent('오류:유효하지 않은 달입니다.');
  });

  it('연도가 유효하지 않으면 오류 메세지가 뜬다.', () => {
    render(<CardExpiryDate />);
    const yearInput = screen.getByRole('textbox', { name: 'false' });

    fireEvent.change(yearInput, { target: { value: '20' } });
    fireEvent.blur(yearInput);

    const errorMessage = screen.getByText('오류:');
    expect(errorMessage).toHaveTextContent('오류:유효하지 않은 연도입니다.');
  });
  it('입력값이 유효하면 오류 메세지가 없다.', () => {
    render(<CardExpiryDate />);
    const monthInput = screen.getByRole('textbox', { name: 'false' });
    const yearInput = screen.getByRole('textbox', { name: 'false' });

    fireEvent.change(monthInput, { target: { value: '12' } });
    fireEvent.blur(monthInput);

    fireEvent.change(yearInput, { target: { value: '25' } });
    fireEvent.blur(yearInput);

    const errorMessage = screen.getByText('오류:');
    expect(errorMessage).toHaveTextContent('오류:');
  });
});
