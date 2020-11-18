import React from 'react';
import styled from 'styled-components';
import OuterBox from './OuterBox';
import InnerBox from './InnerBox';
import LogoLink from '../Header/LogoLink';

export default function SignUp({ children, screenRegistration }) {
  return (
    <Container>
      <OuterBox screenRegistration={screenRegistration}>
        <InnerBox>
          <LogoLink style={{ margin: 'auto' }} to="/" />
          {children}
        </InnerBox>
      </OuterBox>
    </Container>
  );
}

const Container = styled.main`
  @media (min-width: 768px) {
    min-height: calc(100vh - var(--height-header-desktop));
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
