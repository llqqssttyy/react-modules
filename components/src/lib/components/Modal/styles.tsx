import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

// 전역 스타일 컴포넌트
export const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        --shadow: 0px 0px 18px 6px rgba(0, 0, 0, 0.19);
        --border-radius: 0.5rem;

        /* z-index */
        --z-index-backdrop: 1000;
        --z-index-contents: 1001;

        /* colors */
        --color-white: #fff;

        --color-bg-contents: var(--color-white);
        --color-bg-primary: #333333;
        --color-bg-secondary: var(--color-white);

        --color-border-btn: #33333340;

        --color-txt-primary-btn: var(--color-white);
        --color-txt-secondary-btn: #333333bf;
        --color-txt-close-btn: #8b95a1;
        --color--txt-description: #0a0d13;

        /* size */
        --button-small: 5rem;
        --modal-small: 20rem;
        --modal-medium: 30rem;
        --modal-large: 37.5rem;
      }

      * {
        box-sizing: border-box;
      }

      button {
        all: unset;
        display: block;
      }

      button:hover {
        cursor: pointer;
      }
    `}
  />
);

export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-backdrop);
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  z-index: var(--z-index-contents);
  box-shadow: var(--shadow);
  background: var(--color-bg-contents);
  padding: 1.5rem 2rem;

  /* size */
  &.fitContent {
    width: fit-content;
  }

  &.small {
    width: var(--modal-small);
  }

  &.medium {
    width: var(--modal-medium);
  }

  &.large {
    width: var(--modal-large);
  }

  /* position */
  &.defaultPosition,
  &.center {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 0.5rem;
  }

  &.bottom {
    position: fixed;
    bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    width: 100%;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;
  text-align: left;
`;

export const Description = styled.p`
  margin: 0;
  color: var(--color--txt-description);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: left;
`;

export const Button = styled.button`
  border-radius: 0.3125rem;
  padding: 0.5rem 0;
  font-weight: 700;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  text-align: center;

  &.small {
    width: var(--button-small);
  }

  &.fullWidth {
    width: 100%;
  }

  &.primary {
    background-color: var(--color-bg-primary);
    color: var(--color-txt-primary-btn);
  }

  &.secondary {
    border: 1px solid var(--color-border-btn);
    background-color: var(--color-bg-secondary);
    color: var(--color-txt-secondary-btn);
  }
`;

export const CloseButton = styled.button`
  &.box {
    width: 100%;
    height: 2.75rem;
    color: var(--color-txt-close-btn);
    font-weight: 700;
    font-size: 0.9375rem;
    line-height: 1.375rem;
    text-align: center;
  }

  &.icon {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    width: 24px;
    height: 24px;
  }
`;
