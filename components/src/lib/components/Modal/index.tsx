import { MouseEvent, useMemo } from 'react';

import clsx from 'clsx';
import styles from './style.module.css';

import ModalPortal from './ModalPortal';
import ModalContext from '../../contexts/modalContext';
import useModalContext from '../../hooks/useModalContext';
import CloseButtonIcon from './CloseButtonIcon';

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

function CloseButton({
  buttonType = 'box',
  onClick,
  onSuccess,
  onError,
  children,
  className,
  ...attribute
}: CloseButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await onClick(e);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(className, buttonType ? styles[buttonType] : styles.defaultCloseButton)}
      {...attribute}
    >
      {buttonType === 'box' ? children : <CloseButtonIcon />}
    </button>
  );
}

function Button({
  type = 'button',
  size = 'fullWidth',
  variant = 'primary',
  onClick,
  onSuccess,
  onError,
  children,
  className,
  ...attribute
}: ModalButtonProps) {
  const buttonClassName = clsx(className, styles.button, styles[size], styles[variant]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await onClick(e);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error);
    }
  };

  return (
    <button className={buttonClassName} type={type} onClick={handleClick} {...attribute}>
      {children}
    </button>
  );
}

Modal.Title = Title;
Modal.Description = Description;
Modal.Button = Button;
Modal.CloseButton = CloseButton;

export default Modal;
