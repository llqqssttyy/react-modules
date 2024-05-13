# llqqssttyy-react-modules-hooks

> 우아한테크코스 레벨2 페이먼츠 미션에 사용된 유효성 검사 모듈

## 목차

<details>
<summary>펼치기</summary>
<div markdown="1">

- [llqqssttyy-react-modules-hooks](#llqqssttyy-react-modules-hooks)
  - [목차](#목차)
  - [시작하기](#시작하기)
    - [설치하기](#설치하기)
    - [라이브러리 살펴 보기](#라이브러리-살펴-보기)
  - [Hooks](#hooks)
    - [useCardHolder](#usecardholder)
      - [유효성 검사 목록](#유효성-검사-목록)
      - [타입](#타입)
      - [파라미터](#파라미터)
      - [반환](#반환)
    - [useCVC](#usecvc)
      - [유효성 검사 목록](#유효성-검사-목록-1)
      - [파라미터](#파라미터-1)
      - [반환](#반환-1)
    - [usePassword](#usepassword)
      - [유효성 검사 목록](#유효성-검사-목록-2)
      - [타입](#타입-1)
      - [파라미터](#파라미터-2)
      - [반환](#반환-2)
    - [useCardIssuer](#usecardissuer)
      - [유효성 검사 목록](#유효성-검사-목록-3)
      - [타입](#타입-2)
      - [파라미터](#파라미터-3)
      - [반환](#반환-3)
    - [useCardNumbers](#usecardnumbers)
      - [유효성 검사 목록](#유효성-검사-목록-4)
      - [타입](#타입-3)
      - [파라미터](#파라미터-4)
      - [반환](#반환-4)
    - [useExpiryDate](#useexpirydate)
      - [유효성 검사 목록](#유효성-검사-목록-5)
      - [타입](#타입-4)
      - [파라미터](#파라미터-5)
      - [반환](#반환-5)
    - [useSingleInput](#usesingleinput)
      - [사용 예시](#사용-예시)
    - [useMultipleInput](#usemultipleinput)
      - [사용 예시](#사용-예시-1)
  - [Deep Dive](#deep-dive)
    - [useValidation](#usevalidation)
      - [타입](#타입-5)
      - [사용 예시](#사용-예시-2)
    - [getCardBrand](#getcardbrand)
    - [useExpiryDate](#useexpirydate-1)

</div>
</details>

<br/>

## 시작하기

`llqqssttyy-react-modules-hooks`은 카드 결제 정보 입력 시 각 입력 필드의 유효성과 상태를 체계적으로 관리하기 위한 유용한 훅들을 포함하고 있습니다.

<br/>

### 설치하기

```shell
npm install llqqssttyy-react-modules-hooks
```

<br/>

### 라이브러리 살펴 보기

기본적인 API는 모두 동일합니다. 컴포넌트에 알맞는 훅을 임포트하고, input의 값을 관리하는 value의 초기 값과 유효성 검사에 실패할 때 화면에 표시할 에러 문구를 전달해 주세요.

> 🟡 **참고**
>
> 실제 유효성 검사의 순서는 `validations`로 전달된 유효성 검사 목록의 순서를 따릅니다.
> 예를 들어 onBlur에 `empty`, `length`를 순서대로 전달하면, 값이 비어있는지 검사한 후 입력 값의 길이가 적절한지 검사합니다.

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

<br/>

> 🟡 **참고**
>
> `validations` props의 타입은 다음과 같습니다.
>
> ```ts
> export interface Validations {
>   onChange?: Record<string, string>;
>   onBlur?: Record<string, string>;
> }
> ```
>
> `onChange`와 `onBlur` 객체의 key는 각 커스텀 훅에 선언된 `ValidationErrors`의 key를 따라야 합니다. `ValidationErrors`는 각 훅에서 사용 가능한 유효성 검사 목록과 같습니다. 이는 훅 마다 정의가 다르니 문서를 참고해주세요.
>
> ```ts
> // useCVC.ts
>
> interface ValidationErrors {
>   empty: string;
>   number: string;
>   length: string;
> }
> ```
>
> <br/>

<br/>

## Hooks

아래의 유효 검사를 통과하지 못할 경우 각 훅에 전달된 `errorMessage[key]`에 해당하는 오류 메세지가 화면에 나타납니다.

### useCardHolder

#### 유효성 검사 목록

| key        | 설명                                      |
| ---------- | ----------------------------------------- |
| `empty`    | 입력값이 비어있을 경우를 검사합니다.      |
| `alphabet` | 입력값이 영문자가 아닐 경우를 검사합니다. |

<br/>

<details>
<summary><b>명세</b></summary>
<div markdown="1">

#### 타입

```ts
interface ValidationErrors {
  empty: string;
  alphabet: string;
}

interface UseCardHolderProps {
  initialValue: string;
  validations: Validations;
}
```

<br/>

#### 파라미터

| 이름           | type          | 설명                                                          |
| -------------- | ------------- | ------------------------------------------------------------- |
| `initialValue` | `string`      | 입력 필드의 초기 값.                                          |
| `validations`  | `Validations` | 입력 검증을 위한 규칙. onChange와 onBlur 이벤트에 적용됩니다. |

<br/>

#### 반환

| 이름            | type                                   | 설명                                                  |
| --------------- | -------------------------------------- | ----------------------------------------------------- |
| `cardHolder`    | `string`                               | 현재 입력된 카드 소유자 값.                           |
| `setCardHolder` | `Dispatch<SetStateAction<string>>`     | 카드 소유자 값을 설정하는 함수.                       |
| `isValid`       | `boolean`                              | 입력 값의 유효성. 유효하면 true, 그렇지 않으면 false. |
| `errorMessage`  | `string \| null`                       | 입력 검증 실패 시 표시될 에러 메시지.                 |
| `validators`    | `Validator[]`                          | `onChange` 및 `onBlur` 검증을 위한 검증자 목록.       |
| `onChange`      | `ChangeEventHandler<HTMLInputElement>` | 입력 필드의 값이 변경될 때 호출되는 함수.             |
| `onBlur`        | `FocusEventHandler<HTMLInputElement>`  | 입력 필드에서 포커스가 벗어날 때 호출되는 함수.       |

</div>
</details>

<br/>

### useCVC

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 3자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

<br/>

<details>
<summary><b>명세</b></summary>
<div markdown="1">

#### 파라미터

| 이름           | type                                   | 설명                                                          |
| -------------- | -------------------------------------- | ------------------------------------------------------------- |
| `initialValue` | `string`                               | 입력 필드의 초기 값.                                          |
| `validations`  | `{ onChange: object; onBlur: object }` | 입력 검증을 위한 규칙. onChange와 onBlur 이벤트에 적용됩니다. |

<br/>

#### 반환

| 이름           | type                                   | 설명                                                  |
| -------------- | -------------------------------------- | ----------------------------------------------------- |
| `cvc`          | `string`                               | 현재 입력된 CVC 값.                                   |
| `setCVC`       | `Dispatch<SetStateAction<string>>`     | CVC 값을 설정하는 함수.                               |
| `isValid`      | `boolean`                              | 입력 값의 유효성. 유효하면 true, 그렇지 않으면 false. |
| `errorMessage` | `string \| null`                       | 입력 검증 실패 시 표시될 에러 메시지.                 |
| `validators`   | `Validator[]`                          | `onChange` 및 `onBlur` 검증을 위한 검증자 목록.       |
| `onChange`     | `ChangeEventHandler<HTMLInputElement>` | 입력 필드의 값이 변경될 때 호출되는 함수.             |
| `onBlur`       | `FocusEventHandler<HTMLInputElement>`  | 입력 필드에서 포커스가 벗어날 때 호출되는 함수.       |

</div>
</details>

<br/>

### usePassword

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 2자리인지 검사합니다. |
| `number` | 사용자가 숫자를 입력했는 지를 검사합니다.    |

<br/>

<details>
<summary><b>명세</b></summary>
<div markdown="1">

#### 타입

```ts
interface ValidationErrors {
  empty: string;
  number: string;
  length: string;
}

interface UsePasswordProps {
  initialValue: string;
  validations: Validations;
}
```

<br/>

#### 파라미터

| 이름           | type          | 설명                                                          |
| -------------- | ------------- | ------------------------------------------------------------- |
| `initialValue` | `string`      | 입력 필드의 초기 값.                                          |
| `validations`  | `Validations` | 입력 검증을 위한 규칙. onChange와 onBlur 이벤트에 적용됩니다. |

<br/>

#### 반환

| 이름           | type                                   | 설명                                                  |
| -------------- | -------------------------------------- | ----------------------------------------------------- |
| `password`     | `string`                               | 현재 입력된 카드 비밀번호 값.                         |
| `setPassword`  | `Dispatch<SetStateAction<string>>`     | 카드 비밀번호 값을 설정하는 함수.                     |
| `isValid`      | `boolean`                              | 입력 값의 유효성. 유효하면 true, 그렇지 않으면 false. |
| `errorMessage` | `string \| null`                       | 입력 검증 실패 시 표시될 에러 메시지.                 |
| `validators`   | `Validator[]`                          | `onChange` 및 `onBlur` 검증을 위한 검증자 목록.       |
| `onChange`     | `ChangeEventHandler<HTMLInputElement>` | 입력 필드의 값이 변경될 때 호출되는 함수.             |
| `onBlur`       | `FocusEventHandler<HTMLInputElement>`  | 입력 필드에서 포커스가 벗어날 때 호출되는 함수.       |

</div>
</details>

<br/>

### useCardIssuer

#### 유효성 검사 목록

| key     | 설명                                 |
| ------- | ------------------------------------ |
| `empty` | 입력값이 비어있을 경우를 검사합니다. |

<br/>

<details>
<summary><b>명세</b></summary>
<div markdown="1">

#### 타입

```ts
interface ValidationErrors {
  empty: string;
}

interface UseCardIssuerProps {
  initialValue: string;
  validations: Validations;
}
```

<br/>

#### 파라미터

| 이름           | type          | 설명                                                          |
| -------------- | ------------- | ------------------------------------------------------------- |
| `initialValue` | `string`      | 입력 필드의 초기 값.                                          |
| `validations`  | `Validations` | 입력 검증을 위한 규칙. onChange와 onBlur 이벤트에 적용됩니다. |

<br/>

#### 반환

| 이름            | type                                   | 설명                                                  |
| --------------- | -------------------------------------- | ----------------------------------------------------- |
| `cardIssuer`    | `string`                               | 현재 입력된 카드 발급사 값.                           |
| `setCardIssuer` | `Dispatch<SetStateAction<string>>`     | 카드 발급사 값을 설정하는 함수.                       |
| `isValid`       | `boolean`                              | 입력 값의 유효성. 유효하면 true, 그렇지 않으면 false. |
| `errorMessage`  | `string \| null`                       | 입력 검증 실패 시 표시될 에러 메시지.                 |
| `validators`    | `Validator[]`                          | `onChange` 및 `onBlur` 검증을 위한 검증자 목록.       |
| `onChange`      | `ChangeEventHandler<HTMLInputElement>` | 입력 필드의 값이 변경될 때 호출되는 함수.             |
| `onBlur`        | `FocusEventHandler<HTMLInputElement>`  | 입력 필드에서 포커스가 벗어날 때 호출되는 함수.       |

</div>
</details>

<br/>

### useCardNumbers

#### 유효성 검사 목록

| key      | 설명                                         |
| -------- | -------------------------------------------- |
| `empty`  | 입력값이 비어있을 경우를 검사합니다.         |
| `length` | 사용자가 입력한 문구가 4자리인지 검사합니다. |

<br/>

<details>
<summary><b>명세</b></summary>
<div markdown="1">

#### 타입

```ts
interface ValidationErrors {
  empty: string;
  number: string;
}

interface UseCardNumbersProps {
  initialValue: string;
  validations: Validations;
}
```

<br/>

#### 파라미터

| 이름           | type          | 설명                                                          |
| -------------- | ------------- | ------------------------------------------------------------- |
| `initialValue` | `string`      | 입력 필드의 초기 값.                                          |
| `validations`  | `Validations` | 입력 검증을 위한 규칙. onChange와 onBlur 이벤트에 적용됩니다. |

<br/>

#### 반환

| 이름                | type                                                                       | 설명                                                                             |
| ------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `cardNumbers`       | `string`                                                                   | 현재 입력된 카드 발급사 값.                                                      |
| `brand`             | `Brand` <br/> 'visa' \| 'master' \| 'diners' \| 'amex' \| 'union' \| 'etc' | 현재 입력된 카드 발급사 값.                                                      |
| `formatCardNumbers` | `(cardNumbers: string) => string`                                          | 현재 입력된 카드 번호를 전달 받아 해당하는 brand에 맞게 포맷팅하여 반환하는 함수 |
| `setCardNumbers`    | `Dispatch<SetStateAction<string>>`                                         | 카드 발급사 값을 설정하는 함수.                                                  |
| `isValid`           | `boolean`                                                                  | 입력 값의 유효성. 유효하면 true, 그렇지 않으면 false.                            |
| `errorMessage`      | `string \| null`                                                           | 입력 검증 실패 시 표시될 에러 메시지.                                            |
| `validators`        | `Validator[]`                                                              | `onChange` 및 `onBlur` 검증을 위한 검증자 목록.                                  |
| `onChange`          | `ChangeEventHandler<HTMLInputElement>`                                     | 입력 필드의 값이 변경될 때 호출되는 함수.                                        |
| `onBlur`            | `FocusEventHandler<HTMLInputElement>`                                      | 입력 필드에서 포커스가 벗어날 때 호출되는 함수.                                  |

</div>
</details>

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

<details>
<summary><b>명세</b></summary>
<div markdown="1">

#### 타입

```ts
interface ValidationErrors {
  empty: string;
}

export interface ExpiryDate {
  month: string;
  year: string;
}

interface UseExpiryDateProps {
  initialValues: Record<keyof ExpiryDate, string>;
  validations: { month: Validations; year: Validations };
}
```

<br/>

#### 파라미터

| 이름            | type                               | 설명                                                               |
| --------------- | ---------------------------------- | ------------------------------------------------------------------ |
| `initialValues` | `Record<keyof ExpiryDate, string>` | 입력 필드의 초기 값. 'month'와 'year'를 키로 가지고 있어야 합니다. |
| `validations`   | `Validations`                      | 입력 검증을 위한 규칙. 'month'와 'year'를 따로 전달해야 합니다.    |

<br/>

#### 반환

| 이름            | type                                   | 설명                                                  |
| --------------- | -------------------------------------- | ----------------------------------------------------- |
| `expiryDate`    | `{ month: string, year: string }`      | 현재 입력된 카드 만료일 값.                           |
| `setExpiryDate` | `Dispatch<SetStateAction<string>>`     | 카드 만료일 값을 설정하는 함수.                       |
| `isValid`       | `{ month: boolean, year: boolean }`    | 입력 값의 유효성. 유효하면 true, 그렇지 않으면 false. |
| `errorMessage`  | `string \| null`                       | 입력 검증 실패 시 표시될 에러 메시지.                 |
| `onChange`      | `ChangeEventHandler<HTMLInputElement>` | 입력 필드의 값이 변경될 때 호출되는 함수.             |
| `onBlur`        | `FocusEventHandler<HTMLInputElement>`  | 입력 필드에서 포커스가 벗어날 때 호출되는 함수.       |

</div>
</details>

<br/>
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

<br/>

<br/>
<br/>

## Deep Dive

### useValidation

유효성 검사 배열 `validators`를 전달 받아 실행 가능한 validate 함수를 반환하는 커스텀 훅입니다.

#### 타입

```ts
export type ValidatorFunction = (value: string) => boolean;

export interface Validator {
  test: ValidatorFunction;
  errorMessage: string;
}

interface UseValidationProps {
  validators: Validator[] | null;
}
```

<br/>

#### 사용 예시

```ts
// 훅 또는 컴포넌트 내부에서
const validators = [
  {test: (value: string) => !!value, errorMessage: '빈 값은 입력할 수 없습니다.'}
  {test: (value: string) => Number.isInteger(Number(value)), errorMessage: '숫자가 아닌 문자는 입력할 수 없습니다.'}
]

const { validate } = useValidation({ validators });
```

<br/>

> 🔵 Tip
>
> 만약 test에 들어갈 유효성 검사 함수의 매개변수로 value 외 다른 정보가 필요하다면 고차함수를 사용해보세요.
>
> ```ts
> (value: string) => (value: string, length: number) => value.length === length;
> ```
>
> <br/>

<br/>

### getCardBrand

카드 번호의 브랜드를 판단하는 유틸리티 함수입니다. `useCardNumbers` 내부적으로 사용되며, 함수의 반환 값은 `useCardNumbers`에서 `brand`라는 이름으로 사용할 수 있습니다.

```ts
type Brand = 'visa' | 'master' | 'diners' | 'amex' | 'union' | 'etc';
```

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

### useExpiryDate

보통 여러 개의 input이 하나의 필드로 관리되는 상황에서는 `useMultipleInput` 훅의 사용을 권장하지만, `useExpiryDate`는 예외적으로 2개의 `useSingleInput`을 이용하여 구현됩니다.

이는 달과 년도의 유효성 검사 목록이 다르기 때문입니다.

```ts
// useExpiryDate.ts 내부 코드
// useExpiryDateMonth와 useExpiryDateYear는 각각 useSingleInput 훅을 사용합니다.
const {
  month,
  setMonth,
  isValid: isMonthValid,
  errorMessage: monthErrorMessage,
  handleChange: handleMonthChange,
  handleBlur: handleMonthBlur,
} = useExpiryDateMonth({ initialValue: initialValues.month, validations: { ...validations.month } });

const {
  year,
  setYear,
  isValid: isYearValid,
  errorMessage: yearErrorMessage,
  handleChange: handleYearChange,
  handleBlur: handleYearBlur,
} = useExpiryDateYear({ initialValue: initialValues.year, validations: { ...validations.year } });
```

<br/>
