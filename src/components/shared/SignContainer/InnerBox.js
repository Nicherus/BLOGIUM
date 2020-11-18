import styled from 'styled-components';

const InnerBox = styled.div`
  h1 {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    font-family: 'Merriweather', Georgia, Cambria, 'Times New Roman', Times, serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
  }

  h2 {
    display: none;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 32px;
      line-height: 36px;
    }

    h2 {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 25px;
      max-width: 360px;
      font-weight: 400;
      font-size: 19px;
      line-height: 24px;
      color: var(--color-font-sub-primary);
    }

    form {
      padding-top: 0;
    }
  }

  @media (min-width: 1000px) {
    form {
      max-width: 300px;
    }
  }
`;

export default InnerBox;
