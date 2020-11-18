import styled, { css } from 'styled-components';
import textStyles from './textStyles';
import { primaryColor, size } from './defaultTheme';

const ClapCountTotal = styled.span`
  transform: scale(1);
  text-align: center;
  left: 0;
  ${textStyles}
  ${() => css`
    top: -${size / 3}px;
    color: ${primaryColor};
    width: ${size}px;
  `}
`;

export default ClapCountTotal;
