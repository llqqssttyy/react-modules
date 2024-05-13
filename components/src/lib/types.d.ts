type ModalSize = 'small' | 'medium' | 'large';
type ModalPosition = 'center' | 'bottom';

type CloseButtonType = 'icon' | 'box';
type ModalButtonSize = 'small' | 'fullWidth';
type ModalButtonVariant = 'primary' | 'secondary';

type HTMLAttributes<T> = React.HTMLAttributes<T>;

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isModalOpen: boolean;
  closeModal: () => void;
  size?: ModalSize;
  position?: ModalPosition;
  children: React.ReactNode;
}

interface ContentsProps extends HTMLAttributes<HTMLDivElement> {
  position?: ModalPosition;
  size?: ModalSize;
}

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends ButtonAttributes {
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface CloseButtonProps extends ButtonProps {
  buttonType?: CloseButtonType;
}

interface ModalButtonProps extends ButtonProps {
  size?: ModalButtonSize;
  variant?: ModalButtonVariant;
}
