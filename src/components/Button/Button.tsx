import { colors, fonts } from '#theme';
import debounce from 'lodash.debounce';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedbackProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { ButtonProps } from './Button.props';




const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  txtTitle: {
    ...fonts.bold18,
    color: colors.green.primary
  },
  loading: { position: 'absolute', top: 12, right: 10 }
});

export const DebounceButton = React.memo(({ onPress, ...props }: ButtonProps & TouchableWithoutFeedbackProps) => {
  const scale = new Animated.Value(1);
  const debouncedOnPress = () => {
    onPress && onPress();
  };

  const onPressAction = debounce(debouncedOnPress, 300, {
    leading: true,
    trailing: false
  });

  return (
    <TouchableOpacity
      {...props}
      onPress={onPressAction}
      children={<Animated.View style={{ transform: [{ scale }] }}>{props.children}</Animated.View>}
    />
  );
});

export const Button = React.memo(({ onPress, ...props }: ButtonProps & TouchableWithoutFeedbackProps) => {
  const scale = new Animated.Value(1);
  const debouncedOnPress = () => {
    onPress && onPress();
  };

  const onPressAction = debounce(debouncedOnPress, 300, {
    leading: true,
    trailing: false
  });

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={props.activeOpacity}
      onPress={onPressAction}
      children={<Animated.View style={{ transform: [{ scale }] }}>{props.children}</Animated.View>}
    />
  );
});

export const ButtonPrimary = React.memo(
  ({
    onPress,
    title,
    style,
    textStyle,
    isLoading,
    disabled,
    ...props
  }: ButtonProps & TouchableWithoutFeedbackProps) => (
    <DebounceButton
      {...props}
      style={[styles.btnPrimary, style]}
      onPress={onPress}
      disabled={isLoading || disabled}
      children={
        <>
          <Text style={[styles.txtTitle, textStyle]} children={title} />
          {isLoading && <ActivityIndicator color="white" style={styles.loading} />}
        </>
      }
    />
  )
);
