import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../lib/components';

const meta: Meta<typeof Modal.Button> = {
  title: '모달 버튼',
  component: Modal.Button,
  parameters: {
    docs: {
      description: {
        component: 'Modal 컴포넌트에서 재사용할 수 있는 Button입니다.',
        story: '버튼의 크기, 디자인을 선택할 수 있습니다.',
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'fullWidth'],
      description: "버튼의 사이즈를 선택할 수 있습니다. 2가지로 구분되며 기본 값은 'fullWidth'입니다.",
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: "버튼의 테마를 선택할 수 있습니다. 'primary'와 'secondary'를 선택할 수 있습니다.",
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const 확인_버튼: Story = {
  args: {
    children: <>확인</>,
    size: 'small',
    variant: 'primary',
  },
};

export const 취소_버튼: Story = {
  args: {
    children: <>취소</>,
    size: 'small',
    variant: 'secondary',
  },
};

export const 버튼: Story = {
  args: {
    children: <>동의하고 저장하기</>,
    size: 'fullWidth',
    variant: 'primary',
  },
};
