import { FormLogin } from './FormLogin';
import React, { memo } from 'react';

import { Block } from '#components';

const isEqual = require('react-fast-compare');

interface TransportScreenProps {}

const TransportScreenWrapper = ({}: TransportScreenProps) => {
  const _onSubmit = data => {
    console.log(data);
  };
  return (
    <Block marginTop={200} middle>
      <FormLogin onSubmit={_onSubmit} />
    </Block>
  );
};

const TransportScreen = memo(TransportScreenWrapper, isEqual);
export default TransportScreen;
