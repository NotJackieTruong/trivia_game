import React, { Component, LegacyRef } from 'react';
import { Dimensions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';

import R from '#assets';
import { colors, fonts } from '#theme';
import { validateEmail, validatePhoneNumber } from '#utils/FuncHelper';

const { width, height } = Dimensions.get('window');

interface Props<T> {
  label?: string;
  inputRef?: LegacyRef<T>;
  secureTextEntry?: boolean;
  placeHolder?: string;
  value?: string;
  isRequire?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  maxLength?: number;
  autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences';
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  typeValidate?: 'phone' | 'email';
  containerInputStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  errMsg?: string;
  hideRequire?: boolean;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  hideLine?: boolean;
}

interface State {
  value: string;
  error: boolean;
  isFocus: boolean;
  errMsg: string;
}

export default class Input extends Component<Props<any>, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      error: false,
      isFocus: false,
      errMsg: null
    };
  }

  getErrorMessage() {
    const { typeValidate, label } = this.props;
    if (typeValidate === 'phone') {
      return R.strings().phone_number_invalid;
    }
    return R.strings().email_invalid;
  }

  _onBlur = () => {
    const { value, isFocus } = this.state;
    const { typeValidate } = this.props;
    if (!value || value.trim() === '') {
      this.setState({ error: true, isFocus: false });
    } else if (
      (typeValidate && !validatePhoneNumber(value) && typeValidate === 'phone') ||
      (!validateEmail(value) && typeValidate === 'email')
    ) {
      this.setState({
        error: true,
        isFocus: false,
        errMsg: this.getErrorMessage()
      });
    } else {
      this.setState({ error: false, isFocus: false });
    }
  };

  componentWillReceiveProps(newProps) {
    const { isRequire, value, typeValidate, errMsg } = newProps;
    const { isFocus } = this.state;
    if (isRequire && value && !typeValidate) {
      this.setState({ ...this.state, error: false, value });
    }
    if (isRequire && (!value || value.trim() === '') && isFocus) {
      this.setState({ ...this.state, error: true, value });
    }
    if ((typeValidate && value && isFocus) || errMsg) {
      if (
        (!validatePhoneNumber(value) && typeValidate === 'phone') ||
        (!validateEmail(value) && typeValidate === 'email') ||
        errMsg
      ) {
        this.setState({
          error: true,
          value,
          errMsg: errMsg || this.getErrorMessage()
        });
      } else {
        this.setState({ error: false, value, errMsg: null });
      }
    }
  }

  onFocus = () => {
    const { value } = this.state;
    const { isRequire, typeValidate, errMsg } = this.props;
    if (!typeValidate) {
      this.setState({ isFocus: true, error: !value && isRequire });
    }
    if (
      (typeValidate && typeValidate === 'phone' && !validatePhoneNumber(value)) ||
      (typeValidate === 'email' && !validateEmail(value) && !value.trim()) ||
      errMsg
    ) {
      this.setState({
        error: true,
        isFocus: true,
        errMsg: errMsg || this.getErrorMessage()
      });
    }
  };

  render() {
    const {
      label,
      inputRef,
      secureTextEntry,
      placeHolder,
      value,
      isRequire,
      multiline,
      disabled,
      style,
      maxLength = 100,
      autoCapitalize = 'none',
      keyboardType = 'default',
      typeValidate,
      containerInputStyle,
      hideRequire = false,
      onChangeText,
      onSubmitEditing,
      containerStyle,
      hideLine = false,
      ...props
    } = this.props;
    const { errMsg, error, isFocus } = this.state;
    const errorMessage = errMsg || `${R.strings().please_enter} ${(placeHolder || label).toLowerCase()}`;
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={{ flexDirection: 'row' }}>
          {label && <Text style={styles.label}>{label}</Text>}
          {/* {!hideRequire && isRequire && (
            <View style={{ flexDirection: 'row', marginLeft: 4 }}>
              <Text style={styles.require}>(</Text>
              <Text style={[styles.require, { color: theme.colors.red }]}>*</Text>
              <Text style={styles.require}>)</Text>
            </View>
          )} */}
        </View>
        <View style={[styles.containerInput, disabled ? styles.disable : {}, containerInputStyle]}>
          <TextInput
            style={[styles.input, multiline ? styles.multiline : {}]}
            ref={inputRef}
            autoFocus={isFocus}
            editable={!disabled}
            multiline={multiline}
            keyboardType={keyboardType}
            underlineColorAndroid="transparent"
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            accessibilityLabel={placeHolder}
            placeholder={placeHolder}
            placeholderTextColor="#707070"
            blurOnSubmit={false}
            maxLength={maxLength}
            onBlur={() => (isRequire ? this._onBlur() : {})}
            onFocus={() => this.setState({ isFocus: true })}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            {...props}
          />
        </View>
        {!hideLine && <View style={styles.line} />}
        {error && <Text style={styles.errorText} children={errorMessage} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: { height: 1, backgroundColor: colors.line },
  container: {
    marginTop: 8
  },
  unit: {
    color: '#8D8C8C',
    fontSize: 14,
    fontFamily: R.fonts.regular
  },
  containerInput: {
    flexDirection: 'row',
    // borderWidth: 0.25,
    borderColor: colors.focus,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 0,
    marginTop: -2
  },
  input: {
    ...fonts.semi_bold14,
    paddingVertical: 10,
    flex: 1,
    color: 'black'
  },
  label: {
    ...fonts.semi_bold14,
    color: '#707070',
    marginBottom: 4
  },
  multiline: {
    height: 82,
    textAlignVertical: 'top'
  },
  require: {
    fontSize: 14,
    fontFamily: R.fonts.regular
  },
  errorText: {
    fontSize: 12,
    fontFamily: R.fonts.regular,
    color: colors.error.primary,
    marginTop: 4,
    marginLeft: 6
  },
  leftIcon: {
    width: 29,
    height: 20,
    resizeMode: 'contain'
  },
  centerIcon: {
    position: 'absolute',
    top: 10,
    right: width / 2 - 20
  },
  disable: {
    backgroundColor: '#ECECEC'
  }
});
