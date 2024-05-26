import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Portal = styled.div`
  position: fixed;
  z-index: 90;
  inset: 0;
`;

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const $body = document.body;

  const stopModalPropagation = (e: globalThis.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    $body.addEventListener('click', stopModalPropagation);

    return () => {
      $body.removeEventListener('click', stopModalPropagation);
    };
  }, []);

  return createPortal(<Portal id="modal-portal-root">{children}</Portal>, $body, 'modal-portal');
}
