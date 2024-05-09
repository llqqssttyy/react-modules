import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './style.module.css';

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

  return createPortal(
    <div id="modal-portal-root" className={styles.portal}>
      {children}
    </div>,
    $body,
    'modal-portal',
  );
}
