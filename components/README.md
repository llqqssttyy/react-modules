# llqqssttyy-react-modules-components

우아한테크코스 페이먼츠 미션에서 재사용 가능한 UI 컴포넌트 라이브러리입니다.

## 목차

- [llqqssttyy-react-modules-components](#llqqssttyy-react-modules-components)
  - [목차](#목차)
  - [설치](#설치)
  - [Flex](#flex)
    - [Props](#props)
  - [Modal](#modal)
    - [props](#props-1)
  - [useModal](#usemodal)
    - [props](#props-2)
    - [returns](#returns)
  - [사용 예시](#사용-예시)

<br/>

## 설치

```
npm i llqqssttyy-react-modules-components
```

<br/>

## Flex

> css의 flex box 속성으로 레이아웃을 쉽게 잡을 수 있도록 하는 재사용 가능한 컴포넌트입니다.

### Props

|      이름      | 설명                                                                                                                                                              | 필수 |
| :------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--: |
|    children    | Flex로 감쌀 요소를 전달하세요.                                                                                                                                    |  ⭕️  |
| flexDirection  | 플렉스 컨테이너 내의 아이템을 배치할 때 사용할 주축 및 방향(정방향, 역방향)을 지정합니다. 기본 값은 'row'입니다.                                                  |  ❌  |
| justifyContent | 플렉스 컨테이너의 축을 기준으로 어떻게 정렬할 것인지를 정의합니다. 기본 값은 'flex-start'입니다.                                                                  |  ❌  |
|   alignItems   | 플렉스박스의 교차축을 따라 아이템을 정렬합니다. 기본 값은 'center'입니다.                                                                                         |  ❌  |
|    flexWrap    | flex-item 요소들이 강제로 한줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정합니다. 기본 값은 'nowrap'입니다. |  ❌  |
|  alignContent  | 콘텐츠 사이와 콘텐츠 주위 빈 공간을 플렉스 박스의 교차축을 따라 배치하는 방식을 결정합니다. 기본 값은 'stretch'입니다.                                            |  ❌  |
|      gap       | 행과 열 사이의 간격 (gutters)을 설정합니다. 기본 값은 '0'입니다.                                                                                                  |  ❌  |
|     style      | 플렉스 컨테이너의 추가적인 style을 적용하고 싶을 때 사용합니다.                                                                                                   |  ❌  |

<br/>

## Modal

> 💡 Compound Pattern을 사용하여 원하는 모달을 자유롭게 만들 수 있습니다.

- Modal.Title
- Modal.Description
- Modal.CloseBtn
- Modal.Button

### props

|       이름        | 설명                                                                                                                                    | 필수 |
| :---------------: | --------------------------------------------------------------------------------------------------------------------------------------- | :--: |
|    isModalOpen    | 모달의 열림/닫힘 여부를 관리하는 상태입니다. useModal 훅에서 반환받을 수 있습니다.                                                      |  ⭕️  |
|    closeModal     | 모달의 열림/닫힘 여부를 관리하는 상태입니다. useModal 훅에서 반환받을 수 있습니다.                                                      |  ⭕️  |
|     children      | 모달의 컨텐츠 내에 들어갈 컴포넌트를 전달하세요.                                                                                        |  ⭕️  |
|       size        | 모달의 사이즈를 결정합니다. small, medium, large 중 선택 가능하며, 아무 값도 전달되지 않을 경우 모달 내부의 컨텐츠에 크기가 맞춰집니다. |  ❌  |
|     position      | 모달의 위치를 결정합니다. center, bottom 중 선택 가능하며, 기본값은 center입니다.                                                       |  ❌  |
| HTMLDivAttributes | style, id 등 추가적으로 넣고 싶은 attribute을 추가하세요.                                                                               |  ❌  |

<br/>

## useModal

> Modal을 핸들링하기 위한 상태와 함수를 반환하는 커스텀 훅입니다.

### props

|       이름        | 설명                                            | 필수 |
| :---------------: | ----------------------------------------------- | :--: |
| initialModalState | 모달의 초기 상태입니다. true: 열림, false: 닫힘 |  ⭕️  |

### returns

|    이름     | 설명                               |
| :---------: | ---------------------------------- |
| isModalOpen | 모달의 상태를 저장하는 상태입니다. |
|  openModal  | 모달을 여는 함수입니다.            |
| closeModal  | 모달을 닫는 함수입니다.            |

<br/>

## 사용 예시

Flex, Modal, useModal을 사용해 손 쉽게 원하는 모달을 만들어 보세요.

```tsx
export default function TermsConditionConfirmModal() {
  const { isModalOpen, closeModal } = useModal(false);

  const action = () => {
    confirm('동의하십니까?');
  };

  return (
    <Modal position={position} isModalOpen={isOpen} closeModal={closeModal}>
      <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
        <Modal.Title>약관에 동의해 주세요</Modal.Title>
        {closeButtonType === 'icon' && <Modal.CloseButton buttonType="icon" />}
      </Flex>
      <Flex flexDirection="column" gap="0.5rem" style={{ color: '#8B95A1' }}>
        <p style={{ margin: '0', height: '1.5rem' }}>[필수] 개인정보 수집이용 동의</p>
        <p style={{ margin: '0', height: '1.5rem' }}>[필수] 고객정보 제 3자 제공동의</p>
      </Flex>
      <Modal.Button onClick={action} variant="primary" size="fullWidth">
        동의하고 저장하기
      </Modal.Button>
      {closeButtonType === 'box' && <Modal.CloseButton buttonType="box">닫기</Modal.CloseButton>}
    </Modal>
  );
}
```
