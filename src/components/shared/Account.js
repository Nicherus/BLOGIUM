import styled from 'styled-components';

const Account = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-font-sub-primary);

  a {
    color: #218799;
  }

  ${({ screenRegistration }) =>
    screenRegistration &&
    `
    a {
        color: #03a87c;
      }
  `}
`;

export default Account;
