import { MouseEvent, useMemo } from 'react';

import clsx from 'clsx';

import ModalPortal from './ModalPortal';
import ModalContext from '../../contexts/modalContext';
import useModalContext from '../../hooks/useModalContext';
import CloseButtonIcon from './CloseButtonIcon';
import * as S from './styles';

function Modal({ isModalOpen, closeModal, children, className, size, position, ...attribute }: ModalProps) {
  const contextValue = useMemo(() => ({ isModalOpen, closeModal }), [isModalOpen, closeModal]);

  if (!isModalOpen) return null;
  return (
    <>
      <S.GlobalStyles />
      <ModalContext.Provider value={contextValue}>
        <ModalPortal>
          <Backdrop />
          <Contents className={className} size={size} position={position} {...attribute}>
            {children}
          </Contents>
        </ModalPortal>
      </ModalContext.Provider>
    </>
  );
}

function Backdrop() {
  const { closeModal } = useModalContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return <S.Backdrop onClick={onClick} />;
}

function Contents({ size, position, children, className, ...attribute }: ContentsProps) {
  return (
    <S.Contents
      className={clsx(className, size ? size : 'fitContent', position ? position : 'defaultPosition')}
      {...attribute}
    >
      {children}
    </S.Contents>
  );
}

function Title({ children, ...attribute }: HTMLAttributes<HTMLHeadingElement>) {
  return <S.Title {...attribute}>{children}</S.Title>;
}

function Description({ children, ...attribute }: HTMLAttributes<HTMLParagraphElement>) {
  return <S.Description {...attribute}>{children}</S.Description>;
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
    <S.CloseButton
      onClick={handleClick}
      className={clsx(className, buttonType ? buttonType : 'defaultCloseButton')}
      {...attribute}
    >
      {buttonType === 'box' ? children : <CloseButtonIcon />}
    </S.CloseButton>
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
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await onClick(e);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error);
    }
  };

  return (
    <S.Button className={clsx(className, size, variant)} type={type} onClick={handleClick} {...attribute}>
      {children}
    </S.Button>
  );
}

Modal.Title = Title;
Modal.Description = Description;
Modal.Button = Button;
Modal.CloseButton = CloseButton;

export default Modal;
