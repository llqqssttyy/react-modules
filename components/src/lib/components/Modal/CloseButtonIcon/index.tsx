import styled from '@emotion/styled';
import CloseButtonImg from '../../../assets/images/closeButton.svg';

const Icon = styled.img`
  img {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export default function CloseButtonIcon() {
  return <Icon src={CloseButtonImg} alt="모달 닫기 아이콘" />;
}
