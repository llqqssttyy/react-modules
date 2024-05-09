import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../lib/components';
import { useModal } from '../lib';

const meta: Meta<typeof Modal.CloseButton> = {
  title: '모달 닫기 버튼',
  component: Modal.CloseButton,
  parameters: {
    docs: {
      description: {
        component: 'Modal 컴포넌트에서 사용할 수 있는 닫기 버튼입니다.',
        story: '버튼의 종류를 선택할 수 있습니다.',
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    buttonType: {
      control: 'select',
      options: ['icon', 'box'],
      description: '닫기 버튼의 종류를 선택할 수 있습니다. 아이콘 버튼과 박스 버튼 중 선택 가능합니다.',
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const 닫기_버튼: Story = {
  args: {
    buttonType: 'icon',
    children: <>닫기</>,
  },
  decorators: [
    (Story, context) => {
      const { isModalOpen, closeModal } = useModal(true);
      return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} size="medium">
          <Story {...context.args} />
        </Modal>
      );
    },
  ],
};
