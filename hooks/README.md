# llqqssttyy-react-modules-hooks

> 우아한테크코스 레벨2 페이먼츠 미션에 사용된 유효성 검사 모듈

<br/>

## How to use

`llqqssttyy-react-modules-hooks`은 카드 결제 정보 입력 시 필요한 여러 종류의 유효성 검사를 위한 hooks 포함하고 있습니다. 아래의 훅들을 사용하여 각 입력 필드의 유효성과 상태를 체계적으로 관리할 수 있습니다.

<br/>

#### 1. 라이브러리 설치

```shell
npm install llqqssttyy-react-modules-hooks
```

#### 2. hook 사용

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

### useCVC

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 3자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

### usePassword

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 2자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

### useCardIssuer

#### 유효성 검사 목록

| key     | 설명                                 |
| ------- | ------------------------------------ |
| `empty` | 입력값이 비어있을 경우를 검사합니다. |

### useCardNumbers

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 4자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

### useExpiryDate

#### 유효성 검사 목록

| key      | 설명                                                                       |
| -------- | -------------------------------------------------------------------------- |
| 'empty'  | 입력값이 비어있을 경우를 검사합니다.                                       |
| 'number' | 입력값이 숫자가 아닐 경우를 검사합니다.                                    |
| 'year'   | 카드 사용 기간 중 연도에 대해 검사합니다.                                  |
| 'month'  | 카드 사용 기간 중 월에 대해 검사합니다.                                    |
| 'date'   | 카드 사용 기간를 바탕으로 당일 기준으로 사용가능한 카드 인지를 검사합니다. |

### useCardType

해당 훅은 카드 번호의 첫 4자리 숫자를 인자로 받아 카드 브랜드를 반환합니다.

```ts
type Brand = 'visa' | 'master' | 'etc';
```

- 카드 첫번째 4자리가 4로 시작하면 'visa'를 반환합니다.
- 카드 첫번째 4자리가 51-55로 시작하면 'master'를 반환합니다.
- 그 외의 경우에는 'etc'를 반환힙나디.

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

  const { value, setValue, isValid, errorMessage, onChange, onBlur } = useSingleInput<HTMLInputElement>({
    initialValue: '',
    validations: { onChange: onChangeValidators, onBlur: onBlurValidators },
  });

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

### useMultipleInput

여러 개의 입력을 관리하기 위한 사용자 정의 훅입니다. 이 훅을 사용해 새로운 훅을 만들거나 입력을 관리하세요.

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
