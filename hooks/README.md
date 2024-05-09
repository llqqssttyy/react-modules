# llqqssttyy-react-modules-hooks

> 우아한테크코스 레벨2 페이먼츠 미션에 사용된 유효성 검사 모듈

## 목차

- [llqqssttyy-react-modules-hooks](#llqqssttyy-react-modules-hooks)
  - [목차](#목차)
  - [시작하기](#시작하기)
    - [설치하기](#설치하기)
    - [사용 예시](#사용-예시)
  - [Hooks](#hooks)
    - [useCardHolder](#usecardholder)
      - [유효성 검사 목록](#유효성-검사-목록)
    - [useCVC](#usecvc)
      - [유효성 검사 목록](#유효성-검사-목록-1)
    - [usePassword](#usepassword)
      - [유효성 검사 목록](#유효성-검사-목록-2)
    - [useCardIssuer](#usecardissuer)
      - [유효성 검사 목록](#유효성-검사-목록-3)
    - [useCardNumbers](#usecardnumbers)
      - [유효성 검사 목록](#유효성-검사-목록-4)
    - [useExpiryDate](#useexpirydate)
      - [유효성 검사 목록](#유효성-검사-목록-5)
    - [useCardBrand](#usecardbrand)
      - [props](#props)
      - [return](#return)
    - [useSingleInput](#usesingleinput)
      - [사용 예시](#사용-예시-1)
    - [useMultipleInput](#usemultipleinput)
      - [사용 예시](#사용-예시-2)

<br/>

## 시작하기

> `llqqssttyy-react-modules-hooks`은 카드 결제 정보 입력 시 필요한 여러 종류의 유효성 검사를 위한 hooks 포함하고 있습니다. 아래의 훅들을 사용하여 각 입력 필드의 유효성과 상태를 체계적으로 관리할 수 있습니다.

### 설치하기

```shell
npm install llqqssttyy-react-modules-hooks
```

<br/>

### 사용 예시

사용은 매우 간단합니다. 컴포넌트에 알맞는 훅을 임포트하고, 초기 값과 유효성 검사에 실패할 때 화면에 표시할 에러 문구를 전달해 주세요.

```tsx
export default function CardCVC() {
  const cvcResult = useCVC({
    initialValue: ''
    validations: {
      onChange: {
        number: '숫자만 입력 가능해요.',
      },
      onBlur: {
        empty: '값을 입력해주세요.',
        length: '세자리 숫자여야 합니다.',
      }
    },
  });

  return (
    <div>
      <h3>card cvc</h3>
      <input
        value={cvcResult.cvc}
        type="text"
        maxLength={3}
        onBlur={cvcResult.handleBlur}
        onChange={cvcResult.handleChange}
      />
      <div>{cvcResult.errorMessage}</div>
    </div>
  );
}
```

각 훅에 대한 자세한 명세는 아래에 제공됩니다.

<br/>

## Hooks

아래의 유효 검사를 통과하지 못할 경우 각 훅에 전달된 errorMessage[key]에 해당하는 오류 메세지가 화면에 나타납니다.

### useCardHolder

#### 유효성 검사 목록

| key        | 설명                                      |
| ---------- | ----------------------------------------- |
| `empty`    | 입력값이 비어있을 경우를 검사합니다.      |
| `alphabet` | 입력값이 영문자가 아닐 경우를 검사합니다. |

<br/>

### useCVC

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 3자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

<br/>

### usePassword

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 2자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

<br/>

### useCardIssuer

#### 유효성 검사 목록

| key     | 설명                                 |
| ------- | ------------------------------------ |
| `empty` | 입력값이 비어있을 경우를 검사합니다. |

<br/>

### useCardNumbers

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 4자리인지 검사합니다. |

<br/>

### useExpiryDate

#### 유효성 검사 목록

| key      | 설명                                                                       |
| -------- | -------------------------------------------------------------------------- |
| 'empty'  | 입력값이 비어있을 경우를 검사합니다.                                       |
| 'number' | 입력값이 숫자가 아닐 경우를 검사합니다.                                    |
| 'year'   | 카드 사용 기간 중 연도에 대해 검사합니다.                                  |
| 'month'  | 카드 사용 기간 중 월에 대해 검사합니다.                                    |
| 'date'   | 카드 사용 기간를 바탕으로 당일 기준으로 사용가능한 카드 인지를 검사합니다. |

<br/>

### useCardBrand

해당 훅은 카드 번호의 첫 4자리 숫자를 인자로 받아 카드 브랜드를 반환합니다.

```ts
type Brand = 'visa' | 'master' | 'diners' | 'amex' | 'union' | 'etc';
```

#### props

|    이름     | 설명                                            | 필수 |
| :---------: | ----------------------------------------------- | ---- |
| cardNumbers | 입력된 전체 카드 번호를 구분자 없이 전달하세요. | ⭕️   |

#### return

| 이름  | 설명                     |
| :---: | ------------------------ |
| brand | 카드 번호의 brand입니다. |

<br/>

<details>
<summary>브랜드 판단 기준</summary>
<div markdown="1">

- visa
  - 4로 시작
  - 16자리
- master
  - 51 ~ 55로 시작
  - 16자리
- Diners
  - 36으로 시작
  - 14자리
- AMEX
  - 34, 37로 시작
  - 15자리
- 유니온페이
  - 622126 ~ 622925로 시작
  - 624 ~ 626로 시작
  - 6282 ~ 6288로 시작
  - 16자리
- 그 외의 경우에는 'etc'

</div>
</details>

<br/>

<details>
<summary>카드 정보 객체(내부에서 사용)</summary>
<div markdown="1">

```ts
const CARD_BRAND: Omit<CardBrand, 'etc'> = {
  visa: {
    cardNumberCount: 12,
    prefixes: [4],
    segmentLength: [4, 4, 4, 4],
  },

  master: {
    cardNumberCount: 12,
    prefixes: [{ from: 51, to: 55 }],
    segmentLength: [4, 4, 4, 4],
  },

  diners: {
    cardNumberCount: 14,
    prefixes: [36],
    segmentLength: [4, 6, 4],
  },

  amex: {
    cardNumberCount: 15,
    prefixes: [34, 37],
    segmentLength: [4, 6, 5],
  },

  union: {
    cardNumberCount: 16,
    prefixes: [
      { from: 622126, to: 622925 },
      { from: 624, to: 626 },
      { from: 6282, to: 6282 },
    ],
    segmentLength: [4, 4, 4, 4],
  },
};
```

</div>
</details>

<br/>

### useSingleInput

하나의 입력을 관리하기 위한 사용자 정의 훅입니다. 이 훅을 사용해 새로운 훅을 만들거나 입력을 관리하세요.

#### 사용 예시

```tsx
export default function useSomething() {
  const onChangeValidators: Validator[] = [{ test: validateNumber, errorMessage: 'this is not a number!' }];

  const onBlurValidators: Validator[] = [
    { test: validateEmpty, errorMessage: 'this is empty!' },
    { test: validateLength, errorMessage: 'this is invalid length!' },
  ];

  const { value, setValue, isValid, errorMessage, handleChange, handleBlur } = useSingleInput<HTMLInputElement>({
    initialValue: '',
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

  const onChange: ChangeEventHandler = (e) => {
    const { value } = e.target;

    // value에 관한 추가적인 처리
    handleChange(value);
  };

  const onBlur: FocusEventHandler = (e) => {
    const { value } = e.currentTarget;

    // value에 관한 추가적인 처리
    handleBlur();
  };

  return {
    value,
    setValue,
    isValid,
    errorMessage,
    handleChange: onChange,
    handleBlur: onBlur,
  };
}
```

<br/>

### useMultipleInput

여러 개의 입력을 관리하기 위한 사용자 정의 훅입니다. 이 훅을 사용해 새로운 훅을 만들거나 입력을 관리하세요.

#### 사용 예시

```tsx
export default function useSomethings() {
  const onChangeValidators: Validator[] = [{ test: validateNumber, errorMessage: 'this is not a number!' }];

  const onBlurValidators: Validator[] = [
    { test: validateEmpty, errorMessage: 'this is empty!' },
    { test: validateLength, errorMessage: 'this is invalid length!' },
  ];

  const {
    values
    setValues,
    isValid,
    errorMessage,
    onChange,
    onBlur,
  } = useMultipleInputs<HTMLInputElement>({
    initialValues: { first: '', second: '', third: '' },
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

  return {
    values,
    setValues,
    isValid,
    errorMessage,
    handleChange: onChange,
    handleBlur: onBlur,
  };
}
```
