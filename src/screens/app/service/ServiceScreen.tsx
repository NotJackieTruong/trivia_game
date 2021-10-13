import React, { memo } from 'react';

import R from '#assets';
import { ImageRemote } from '#components';
import ScreenWrapper from '#components/Screen/ScreenWrapper';

const isEqual = require('react-fast-compare');
const ServiceScreenWrapper = () => {
  return (
    <ScreenWrapper
      titleHeader={R.strings().service}
      children={
        <>
          <ImageRemote
            source={'https://i.pinimg.com/originals/5e/a5/a2/5ea5a25d2c9f72cbc32f6c1c15c1a664.jpg'}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </>
      }
    />
  );
};

const ServiceScreen = memo(ServiceScreenWrapper, isEqual);
export default ServiceScreen;
