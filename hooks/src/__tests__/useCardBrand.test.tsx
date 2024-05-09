import { render, screen } from '@testing-library/react';
import { useCardBrand } from '../lib';

const TestComponent = ({ cardNumbers }: { cardNumbers: string }) => {
  const { brand } = useCardBrand({ cardNumbers });
  return <div data-testid="card-brand">{brand}</div>;
};

describe('useCardBrand', () => {
  it('카드 번호가 4로 시작하면 visa를 반환해야 한다.', () => {
    render(<TestComponent cardNumbers="4111111111111111" />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('visa');
  });

  test.each(['5111111111111111', '5211111111111111', '5311111111111111', '5411111111111111', '5511111111111111'])(
    '카드 번호가 51 ~ 55로 시작하면 master를 반환해야 한다.',
    (number) => {
      render(<TestComponent cardNumbers={number} />);
      const brand = screen.getByTestId('card-brand');
      expect(brand.textContent).toBe('master');
    },
  );

  test.each(['5011111111111111', '5611111111111111'])(
    '카드 번호가 51 ~ 55로 시작하지 않으면 master가 아니다.',
    (number) => {
      render(<TestComponent cardNumbers={number} />);
      const brand = screen.getByTestId('card-brand');
      expect(brand.textContent).not.toBe('master');
    },
  );

  it('카드 번호가 36으로 시작하면 diners다.', () => {
    render(<TestComponent cardNumbers="36111111111111" />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('diners');
  });

  test.each(['3411111111111111', '3711111111111111'])('카드 번호가 34 혹은 37로 시작하면 amex다.', (number) => {
    render(<TestComponent cardNumbers={number} />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('amex');
  });

  test.each(['6221260000000000', '6229250000000000'])('카드 번호가 622126 ~ 622925로 시작하면 union이다.', (number) => {
    render(<TestComponent cardNumbers={number} />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('union');
  });

  test.each(['6240000000000000', '6260000000000000'])('카드 번호가 624 ~ 626로 시작하면 union이다.', (number) => {
    render(<TestComponent cardNumbers={number} />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('union');
  });

  test.each(['6282000000000000', '6288000000000000'])('카드 번호가 6282 ~ 6288로 시작하면 union이다.', (number) => {
    render(<TestComponent cardNumbers={number} />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('union');
  });

  test.each(['6221250000000000', '6229260000000000'])(
    '카드 번호가 622126 ~ 622925로 시작하지 않으면 union이 아니다.',
    (number) => {
      render(<TestComponent cardNumbers={number} />);
      const brand = screen.getByTestId('card-brand');
      expect(brand.textContent).not.toBe('union');
    },
  );

  test.each(['6230000000000000', '6270000000000000'])(
    '카드 번호가 624 ~ 626로 시작하지 않으면 union이 아니다.',
    (number) => {
      render(<TestComponent cardNumbers={number} />);
      const brand = screen.getByTestId('card-brand');
      expect(brand.textContent).not.toBe('union');
    },
  );

  test.each(['6230000000000000', '6270000000000000'])(
    '카드 번호가 6282 ~ 6288로 시작하지 않으면 union이 아니다.',
    (number) => {
      render(<TestComponent cardNumbers={number} />);
      const brand = screen.getByTestId('card-brand');
      expect(brand.textContent).not.toBe('union');
    },
  );

  it('이외의 경우 etc를 반환한다.', () => {
    render(<TestComponent cardNumbers="1234567890123456" />);
    const brand = screen.getByTestId('card-brand');
    expect(brand.textContent).toBe('etc');
  });
});
