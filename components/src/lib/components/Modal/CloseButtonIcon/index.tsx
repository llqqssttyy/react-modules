import CloseButtonImg from '../../../assets/images/closeButton.svg';
import styles from './style.module.css';

export default function CloseButtonIcon() {
  return <img className={styles.closeBtn} src={CloseButtonImg} />;
}
