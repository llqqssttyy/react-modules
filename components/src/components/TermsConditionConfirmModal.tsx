import { useEffect, useState } from 'react';
import { Flex, Modal } from '../lib/components';

export default function TermsConditionConfirmModal({
  position,
  isModalOpen,
  closeButtonType,
  size,
}: {
  position: 'bottom' | 'center';
  isModalOpen: boolean;
  closeButtonType: 'icon' | 'box';
  size?: 'small' | 'medium' | 'large';
}) {
  const [isOpen, setIsOpen] = useState(isModalOpen);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(isModalOpen);
  }, [isModalOpen]);

  const action = () => {
    confirm('동의하십니까?');
  };

  return (
    <Modal position={position} size={size} isModalOpen={isOpen} closeModal={closeModal}>
      <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
        <Modal.Title>약관에 동의해 주세요</Modal.Title>
        {closeButtonType === 'icon' && <Modal.CloseButton onClick={closeModal} buttonType="icon" />}
      </Flex>

      <TermConditions />

      <Modal.Button onClick={action} variant="primary" size="fullWidth">
        동의하고 저장하기
      </Modal.Button>
      {closeButtonType === 'box' && (
        <Modal.CloseButton onClick={closeModal} buttonType="box">
          닫기
        </Modal.CloseButton>
      )}
    </Modal>
  );
}

function TermConditions({}) {
  return (
    <Flex flexDirection="column" alignItems="flex-start" gap="0.5rem" style={{ color: '#8B95A1' }}>
      <p style={{ margin: '0', height: '1.5rem' }}>[필수] 개인정보 수집이용 동의</p>
      <p style={{ margin: '0', height: '1.5rem' }}>[필수] 고객정보 제 3자 제공동의</p>
    </Flex>
  );
}
