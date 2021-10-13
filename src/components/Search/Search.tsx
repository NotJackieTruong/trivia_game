import FstImage from '../FstImage/FstImage';
import isEqual from 'react-fast-compare';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import R from '#assets';
import { colors, fonts } from '#theme';

interface SearchComponentProps {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  maxLength?: number;
  search?: string;
  onSearch: (text: string) => void;
}

const SearchComponent = forwardRef(
  (
    { placeholder, containerStyle, inputStyle, onSearch, maxLength = 50, search, ...restProps }: SearchComponentProps,
    ref
  ) => {
    const [value, setValue] = useState<string | null>(search || null);
    const timeoutRef = useRef<number | null>(null);
    const containerStylePlatForm =
      Platform.OS === 'ios' ? { paddingVertical: Platform.OS === 'ios' ? 10 : -5 } : { height: 42 };
    const onChangeText = (text: string) => {
      setValue(text);
    };

    useImperativeHandle(ref, () => ({
      getValue() {
        return value;
      }
    }));

    useEffect(() => {
      if (value !== null) {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          onSearch(value);
        }, 300);
      }
    }, [value]);

    return (
      <View style={[styles.containerStyle, containerStyle]}>
        <View style={[styles.input, containerStylePlatForm, inputStyle]}>
          <FstImage style={styles.icon} source={R.images.ic_search} />
          <TextInput
            maxLength={maxLength}
            value={value || ''}
            onChangeText={onChangeText}
            placeholder={placeholder || R.strings().enter_content_search}
            style={styles.containerInput}
            clearButtonMode="always"
            ref={ref}
            {...restProps}
          />
        </View>
      </View>
    );
  }
);

const Search = memo(SearchComponent, isEqual);
export default Search;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.line.light,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line.light
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
    tintColor: '#707070'
  },
  iconCam: {
    tintColor: colors.primary,
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 12
  },
  containerInput: {
    ...fonts.regular16,
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
    color: '#000'
  },
  containerStyle: {}
});
