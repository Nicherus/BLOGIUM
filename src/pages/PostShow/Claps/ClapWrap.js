import React, { useState } from 'react';
import styled from 'styled-components';

function ClapWrap({ children, parentRef }) {
  const [isDisplayClear, setDisplayClear] = useState(false);

  function onClick() {
    if (isDisplayClear) {
      setDisplayClear(false);
    }
  }

  function mouseMove() {
    if (!isDisplayClear) {
      setDisplayClear(true);
    }
  }

  function mouseLeave() {
    if (isDisplayClear) {
      setDisplayClear(false);
    }
  }

  return (
    <Wrap onMouseLeave={mouseLeave} ref={parentRef}>
      <ClapWrapChildren onMouseMove={mouseMove} onClick={onClick}>
        {children}
      </ClapWrapChildren>
    </Wrap>
  );
}

export default ClapWrap;

const Wrap = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;
`;

const ClapWrapChildren = styled.div`
  position: relative;
  z-index: 2;
`;
