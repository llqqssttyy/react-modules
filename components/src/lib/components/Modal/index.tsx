import { MouseEvent, useMemo } from 'react';

import clsx from 'clsx';
import styles from './style.module.css';

import ModalPortal from './ModalPortal';
import ModalContext from '../../contexts/modalContext';
import useModalContext from '../../hooks/useModalContext';
import CloseButtonIcon from './CloseButtonIcon';

/**
 *
 * @param {Object} props
 * @param {string} [props.size] 'small' | 'medium' | 'large' 아무 값도 전달하지 않으면 너비가 contents의 크기 만큼 잡힙니다.
 * @param {string} [props.position = 'center'] 'center' | 'bottom'
 * @default position 'center'
 */
function Modal({ isModalOpen, closeModal, children, className, size, position, ...attribute }: ModalProps) {
  const contextValue = useMemo(() => ({ isModalOpen, closeModal }), [isModalOpen, closeModal]);

  if (!isModalOpen) return null;
  return (
    <ModalContext.Provider value={contextValue}>
      <ModalPortal>
        <Backdrop />
        <Contents className={className} size={size} position={position} {...attribute}>
          {children}
        </Contents>
      </ModalPortal>
    </ModalContext.Provider>
  );
}

function Backdrop() {
  const { closeModal } = useModalContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return <div className={styles.backdrop} onClick={onClick} />;
}

function Contents({ size, position = 'center', children, className, ...attribute }: ContentsProps) {
  return (
    <div
      className={clsx(
        className,
        styles.contents,
        size ? styles[size] : styles.fitContent,
        position ? styles[position] : styles.defaultPosition,
      )}
      {...attribute}
    >
      {children}
    </div>
  );
}

function Title({ children, ...attribute }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={styles.title} {...attribute}>
      {children}
    </h2>
  );
}

function Description({ children, ...attribute }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={styles.description} {...attribute}>
      {children}
    </p>
  );
}

/**
 * Modal을 닫을 때 사용 가능한 Button입니다.
 *
 * @param {Object} props
 * @param {string} [props.buttonType = 'box'] - 'box' | 'icon'
 * @default buttonType = 'box'
 */
function CloseButton({ children, buttonType = 'box', className, ...attribute }: CloseButtonProps) {
  const { closeModal } = useModalContext();

  return (
    <button
      onClick={closeModal}
      className={clsx(className, buttonType ? styles[buttonType] : styles.defaultCloseButton)}
      {...attribute}
    >
      {buttonType === 'box' ? children : <CloseButtonIcon />}
    </button>
  );
}

/**
 * Modal 안에서 사용 가능한 Button입니다.
 * @param {Object} props
 *
 * @param {string} [props.size = 'fullWidth'] - 'small' | 'fullWidth'
 * @param {string} [props.variant = 'primary'] - 'primary' | 'secondary'
 * @default size - 'fullWidth'
 * @default variant - 'primary'
 */
function Button({
  children,
  className,
  type = 'button',
  size = 'fullWidth',
  variant = 'primary',
  onClick,
  ...attribute
}: ModalButtonProps) {
  const buttonClassName = clsx(className, styles.button, styles[size], styles[variant]);
  return (
    <button className={buttonClassName} type={type} onClick={onClick} {...attribute}>
      {children}
    </button>
  );
}

Modal.Title = Title;
Modal.Description = Description;
Modal.Button = Button;
Modal.CloseButton = CloseButton;

export default Modal;
