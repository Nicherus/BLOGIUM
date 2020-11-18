import React, { useState } from 'react';
import { useUserContext } from '../../../contexts/UserContext';
import ClapContainer from './ClapContainer';

export default function Claps({ post }) {
  const { user } = useUserContext();
  const [userClaps, setUserClaps] = useState(0);
  const [postTotalClaps, setPostTotalClaps] = useState(0);

  function onCountChange({ count, countTotal }) {
    console.log(count, countTotal);
    console.log(userClaps, postTotalClaps);
    if (count < userClaps) return;

    setUserClaps(count);
    setPostTotalClaps(countTotal);
  }

  if (!user || !post) return null;

  return <ClapContainer count={userClaps} countTotal={postTotalClaps} maxCount={50} onCountChange={onCountChange} />;
}
