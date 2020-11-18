import React, { useRef, useState, forwardRef, useMemo, useEffect } from 'react';

import ClapWrap from './ClapWrap';
import ClapIcon from './ClapIcon';
import ClapButton from './ClapButton';
import ClapCount from './ClapCount';
import ClapCountTotal from './ClapCountTotal';

function ClapContainer(props) {
  const { count, countTotal, isInitiallyHover = false, isInitiallyClicked = false } = props;
  const [isClicked, setClicked] = useState(isInitiallyClicked);
  const [isUnclicked, setUnclicked] = useState(true);
  const [isHover, setHover] = useState(isInitiallyHover);
  const [isLoading, setLoading] = useState(true);
  const clapButtonRef = useRef();
  const clapIconRef = useRef();
  const clapCountRef = useRef();
  const clapCountTotalRef = useRef();

  useEffect(() => {
    // require mo-js on mount so it does not break SSR
    const mojs = require('mo-js');

    const tlDuration = 300;
    const triangleBurst = new mojs.Burst({
      parent: clapButtonRef.current,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        scale: 1,
        stroke: 'rgba(211,84,0 ,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration,
      },
    });

    const circleBurst = new mojs.Burst({
      parent: clapButtonRef.current,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166 ,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const countAnimation = new mojs.Html({
      el: clapCountRef.current,
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -30 },
      opacity: { 0: 1 },
      duration: tlDuration,
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2,
    });

    const opacityStart = count > 0 && isUnclicked ? 1 : 0;

    const countTotalAnimation = new mojs.Html({
      el: clapCountTotalRef.current,
      isShowStart: false,
      isShowEnd: true,
      opacity: { [opacityStart]: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 },
    });

    const scaleButton = new mojs.Html({
      el: clapButtonRef.current,
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out,
    });

    const clap = clapButtonRef.current;
    clap && (clap.style.transform = 'scale(1, 1)');
    const animationTimeline = new mojs.Timeline();
    animationTimeline.add([countAnimation, countTotalAnimation, scaleButton, circleBurst, triangleBurst]);
    console.log('fui chamado!!');

    if (isLoading) {
      setLoading(false);
    } else {
      animationTimeline.replay();
    }
  }, [count]);

  function onClick() {
    const { maxCount, onCountChange } = props;

    if (count < maxCount) {
      onCountChange({ count: count + 1, countTotal: countTotal + 1 });
      setUnclicked(false);
      setClicked(true);
    }
  }

  return (
    <ClapWrap isClicked={isClicked}>
      <ClapButton
        ref={clapButtonRef}
        className="clap"
        onClick={onClick}
        onMouseEnter={(e) => setHover(true)}
        onMouseLeave={(e) => setHover(false)}
        isHover={isHover && count === 0}
      >
        <ClapIcon parentRef={clapIconRef} className="clap--icon" isClicked={isClicked} />
        <ClapCount ref={clapCountRef} className="clap--count">
          +{count}
        </ClapCount>
        <ClapCountTotal ref={clapCountTotalRef} className="clap--count-total">
          {Number(countTotal).toLocaleString()}
        </ClapCountTotal>
      </ClapButton>
    </ClapWrap>
  );
}

export default ClapContainer;
