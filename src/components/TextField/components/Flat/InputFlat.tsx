import { InputFlatProps } from './InputFlat.props';

import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, TextInput } from 'react-native';

import { useInterpolate, useSharedTransition } from '#animated';
import { enhance, onCheckType } from '#common';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from '#components/Block/Block';

const VERTICAL_PADDING = 5;
const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = 'rgb(0,87,231)';
const ERROR_COLOR = 'rgb(214,45,32)';

const styles = StyleSheet.create({
  container: {
    paddingVertical: VERTICAL_PADDING,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: 0,
    marginTop: 10,
    borderBottomColor: 'transparent'
  },
  text: {
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 2
  },
  wrapLabel: {
    position: 'absolute',
    left: 0
  }
});

export const InputFlat = forwardRef<any, InputFlatProps>((props, ref) => {
  // props
  const {
    defaultValue,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    placeholderColor,
    onTextChange,
    onSetValueHookForm,
    trigger,
    nameTrigger,
    inputStyle = {},
    name = '',
    errorBorderColor = ERROR_COLOR,
    errorLabelColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    disabled = false,
    error = undefined,
    rightChildren = undefined,
    containerStyle = {},
    ...rest
  } = props;
  // state
  const [sizeContainer, setSizeContainer] = useState({ height: 0 });
  const [sizeText, setSizeText] = useState({ height: 0 });
  const [focused, setFocused] = useState(false);
  const [restored, setRestored] = useState(false);
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150
  });

  const top = useInterpolate(
    progress,
    [0, 1],
    [sizeContainer.height / 2 - sizeText.height / 2 - VERTICAL_PADDING / 4, 0]
  );

  const fontLabel = useInterpolate(progress, [0, 1], [14, 12]);

  const labelColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledLabelColor;
      case error:
        return errorLabelColor;
      case focused:
        return activeTintLabelColor;
      default:
        return unActiveTintLabelColor;
    }
  }, [disabled, error, focused]);

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledBorderColor;
      case error:
        return errorBorderColor;
      case focused:
        return activeTintBorderColor;
      default:
        return unActiveTintBorderColor;
    }
  }, [disabled, error, focused]);

  // function
  const _onLayoutContainer = useCallback(
    (e: LayoutChangeEvent) => {
      setSizeContainer({ ...sizeContainer, height: e.nativeEvent.layout.height });
    },
    [sizeContainer]
  );

  const onLayoutText = useCallback(
    (e: LayoutChangeEvent) => {
      setSizeText({ ...sizeText, height: e.nativeEvent.layout.height });
    },
    [sizeText]
  );

  const _onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const _onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const _onChangeText = (text: string) => {
    setValue(text);
  };

  // effect
  useEffect(() => {
    if (onTextChange && onCheckType(onTextChange, 'function')) {
      onTextChange(name, value);
    }
    if (onSetValueHookForm && onCheckType(onSetValueHookForm, 'function')) {
      onSetValueHookForm(name, value, {
        shouldDirty: true,
        shouldValidate: true
      });
    }
    if (trigger && onCheckType(trigger, 'function') && nameTrigger && onCheckType(nameTrigger, 'string')) {
      trigger(nameTrigger);
    }
  }, [name, nameTrigger, onSetValueHookForm, onTextChange, trigger, value]);

  useEffect(() => {
    if (typeof defaultValue === 'string' && !restored) {
      setValue(defaultValue);
      setRestored(true);
    }
  }, [defaultValue, restored]);

  // style
  const labelText = useMemo(() => labelTx || label || undefined, [labelTx, label]);

  const placeHolder = useMemo(() => placeholderTx || placeholder || '', [placeholder, placeholderTx]);

  const inputSty = useMemo(() => enhance([styles.input, inputStyle]), [inputStyle]);

  const containerSty = useMemo(() => enhance([styles.container, containerStyle]), [containerStyle]);

  // reanimated style
  const wrapLabelStyle = useAnimatedStyle(() => ({
    top: top.value
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: fontLabel.value,
    color: labelColor.value
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value
  }));

  // render
  return (
    <Animated.View onLayout={_onLayoutContainer} style={[containerSty, containerAnimatedStyle]}>
      <Block direction="row">
        <TextInput
          defaultValue={defaultValue ?? ''}
          autoCorrect={false}
          placeholder={focused === true ? placeHolder : ''}
          placeholderTextColor={placeholderColor ?? undefined}
          selectionColor={activeTintBorderColor}
          underlineColorAndroid="transparent"
          clearButtonMode="always"
          editable={!disabled}
          onChangeText={_onChangeText}
          onFocus={_onFocus}
          onBlur={_onBlur}
          style={inputSty}
          ref={ref}
          {...rest}
        />
        {rightChildren}
      </Block>
      {labelText && (
        <Animated.View pointerEvents="none" style={[styles.wrapLabel, wrapLabelStyle]}>
          <Animated.Text onLayout={onLayoutText} style={[styles.text, labelStyle]}>
            {labelText ?? ''}
          </Animated.Text>
        </Animated.View>
      )}
    </Animated.View>
  );
});
