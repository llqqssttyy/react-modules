import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Issuer from '../components/Issuer';

describe('Issuer', () => {
  it('초기 상태 확인', () => {
    render(<Issuer />);

    const cardIssuers = ['카카오', '현대', '배민'];
    // 카드 발급사 버튼 존재 확인
    cardIssuers.forEach((issuer) => {
      const button = screen.getByRole('button', { name: issuer });
      expect(button).toBeInTheDocument();
    });
    // 오류 메세지 상태 확인
    const errorMessage = screen.getByText('오류:');
    expect(errorMessage).toHaveTextContent('오류:카드 발급사 선택해주세요.');
  });
  it('유효한 카드사를 선택하면 오류 메세지가 발생하지 않는다', () => {
    render(<Issuer />);
    const cardIssuers = ['카카오', '현대', '배민'];

    cardIssuers.forEach((issuer) => {
      const button = screen.getByRole('button', { name: issuer });

      fireEvent.click(button);

      const errorMessage = screen.getByText('오류:');
      expect(errorMessage).toHaveTextContent('오류:');
    });
  });
  describe('카드사를 선택하지 않은 경우 오류 메세지가 뜬다.', () => {
    it('카드사를 선택하지 않고 닫기 버튼 클릭', () => {
      render(<Issuer />);
      const closeButton = screen.getByRole('button', { name: 'close' });
      fireEvent.click(closeButton);

      const errorMessage = screen.getByText('오류:');
      expect(errorMessage).toHaveTextContent('오류:카드 발급사 선택해주세요.');
    });

    it('fieldset 클릭(버튼이 아닌 경우)', () => {
      render(<Issuer />);
      const fieldset = screen.getByRole('group');
      fireEvent.click(fieldset);

      const errorMessage = screen.getByText('오류:');
      expect(errorMessage).toHaveTextContent('오류:카드 발급사 선택해주세요.');
    });
  });
});
