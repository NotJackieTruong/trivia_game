/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormValue } from './FormLogin';
import isEqual from 'react-fast-compare';
import { FieldError } from 'react-hook-form';
import React, { forwardRef, memo } from 'react';

import { Text } from 'react-native';
import { Block, TextField } from '#components';

interface InputProps {
  name: keyof FormValue;
  label: string;
  error?: FieldError | undefined;
  onSubmit?: () => void;
  nameTrigger?: keyof FormValue;
}

const InputComponent = forwardRef<any, InputProps>(({ onSubmit, label, name, nameTrigger, error, ...rest }, ref) => {
  return (
    <Block height={50}>
      <TextField
        onSubmit={onSubmit}
        ref={ref}
        nameTrigger={nameTrigger}
        error={error?.message !== undefined}
        label={label}
        name={name}
        typeInput={'flat'}
        {...rest}
      />
      {error?.message && <Text children={error.message} />}
    </Block>
  );
});

export const Input = memo(InputComponent, isEqual);
