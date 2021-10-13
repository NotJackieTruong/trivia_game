/* eslint-disable @typescript-eslint/no-explicit-any */

import { TextFieldProps } from './TextField.props';
import { InputFlat } from './components/Flat/InputFlat';
import { InputOutline } from './components/OutLine/InputOutline';

import React, { forwardRef } from 'react';

const TextFieldComponent = forwardRef<any, TextFieldProps>((props, refs) => {
  const { typeInput } = props;
  return typeInput === 'flat' ? <InputFlat {...props} ref={refs} /> : <InputOutline {...props} ref={refs} />;
});
export const TextField = TextFieldComponent;
