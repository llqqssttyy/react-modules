type ModalPosition = 'center' | 'bottom';
type CloseButtonType = 'icon' | 'box';
type ModalSize = 'small' | 'medium' | 'large';

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

// Button
type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

interface CloseButtonProps extends ButtonProps {
  buttonType?: CloseButtonType;
}

type ModalButtonSize = 'small' | 'fullWidth';
type ModalButtonVariant = 'primary' | 'secondary';

interface ModalButtonProps extends ButtonProps {
  size?: ModalButtonSize;
  variant?: ModalButtonVariant;
  onClick: () => void;
}
