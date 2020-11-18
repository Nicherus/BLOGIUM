import styled from 'styled-components';
import LoginBG from '../../../assets/images/bg-login-screen.png';

const OuterBox = styled.div`
  padding: 50px;
  width: 100%;
  min-height: calc(100vh - var(--height-header-mobile));
  background-color: #d7efee;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ screenRegistration }) =>
    screenRegistration &&
    `
    background-color: #e8f3ec;
    }
  `}

  @media (min-width: 768px) {
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
    width: auto;
    min-width: 600px;
    min-height: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 1000px) {
    min-width: 900px;
    background-image: url(${LoginBG});
    background-repeat: no-repeat;
    background-position: 20px 100%;
    background-size: auto 290px;
  }
`;

export default OuterBox;
