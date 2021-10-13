import React, { memo } from 'react';

import R from '#assets';
import ScreenWrapper from '#components/Screen/ScreenWrapper';

const isEqual = require('react-fast-compare');

const CommerceScreenWrapper = () => {
  return <ScreenWrapper titleHeader={R.strings().commerce} children={<></>} />;
};

const CommerceScreen = memo(CommerceScreenWrapper, isEqual);
export default CommerceScreen;
