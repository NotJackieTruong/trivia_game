import { Input } from './Input';
import isEqual from 'react-fast-compare';
import { useForm } from 'react-hook-form';
import React, { memo, useMemo } from 'react';

import { Button } from 'react-native';
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from '#components';
import { ValidationMap } from '#components/Form/Form.props';

export type FormValue = {
  name: string;
  password: string;
  re_password: string;
};

interface FormLoginProps {
  onSubmit: (data: FormValue) => void;
}

const FormLoginComponent = ({ onSubmit }: FormLoginProps) => {
  const { register, setValue, trigger, getValues, errors, handleSubmit } = useForm<FormValue>();
  const rules = useMemo(
    () =>
      ({
        name: { required: { value: true, message: 'Name is required' } },
        password: { required: { value: true, message: 'Password is required' } },
        re_password: {
          required: { value: true, message: 'Confirm is required' },
          validate: (val: any) => val === getValues().password || 'Passwords do not match'
        }
      } as ValidationMap<FormValue>),
    [getValues]
  );
  const onSubmitKey = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Form {...{ register, getValues, setValue, trigger, rules, errors }}>
      <Input name={'name'} label={'Name'} />
      <Input nameTrigger={'re_password'} name={'password'} label={'Password'} />
      <Input onSubmit={onSubmitKey} nameTrigger={'password'} name={'re_password'} label={'Confirm Password'} />
      <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
    </Form>
  );
};

export const FormLogin = memo(FormLoginComponent, isEqual);
