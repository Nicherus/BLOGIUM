import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

export default function GuestLink() {
  return (
    <Container>
      <SignInLink to="/sign-in">Sign In</SignInLink>
      <GetStartedLink to="/sign-up">Get started</GetStartedLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SignInLink = styled(Link)`
  margin-right: 11px;
`;

const GetStartedLink = styled(Link)`
  display: inline-block;
  border: 1px solid var(--color-btn-border);
  border-radius: 4px;
  background-color: transparent;
  font-size: 16px;
  color: var(--color-link-text);
  cursor: pointer;
  padding: 0 16px;
  height: 37px;
  line-height: 37px;
`;
