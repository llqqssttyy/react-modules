import type { Meta, StoryObj } from '@storybook/react';
import TermsConditionConfirmModal from '../components/TermsConditionConfirmModal';

const meta: Meta<typeof TermsConditionConfirmModal> = {
  title: '모달',
  component: TermsConditionConfirmModal,
  parameters: {
    docs: {
      description: {
        component: 'Modal 컴포넌트의 요소를 합성하여 다양한 레이아웃의 모달을 만들 수 있습니다.',
        story: '모달의 크기, 위치, 상태를 제어할 수 있습니다.',
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description:
        '모달의 사이즈를 선택할 수 있습니다. 3가지 사이즈로 구분되며 값을 선택하지 않을 경우 내부 콘텐츠의 크기만큼 계산됩니다.',
    },
    position: {
      control: 'select',
      options: ['bottom', 'center'],
      default: 'center',
      description: '모달의 위치를 선택할 수 있습니다. 중앙 모달과 하단 모달 중 선택 가능합니다.',
    },
    isModalOpen: {
      control: 'boolean',
      default: true,
      description: '모달의 열림 상태를 제어합니다.',
    },
    closeButtonType: {
      control: 'select',
      options: ['icon', 'box'],
      default: 'icon',
      description: '닫기 버튼의 종류를 선택할 수 있습니다. 아이콘 버튼과 박스 버튼 중 선택 가능합니다.',
    },
  },
  args: {
    position: 'center',
    isModalOpen: true,
    closeButtonType: 'icon',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const 이용_약관_확인_모달: Story = {
  args: {},
};
