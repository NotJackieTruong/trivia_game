import { DropdownBottom } from './DropdownBottom';
import { ModalDropdownProps } from './ModalDropdown.props';
import { styles } from './styles';

import { Block } from '..';
import { DebounceButton } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import FstImage from '../FstImage/FstImage';

import isEqual from 'react-fast-compare';

import React, { memo, useCallback, useImperativeHandle, useState } from 'react';
import { Text, View } from 'react-native';

import R from '#assets';
import { colors, fonts } from '#theme';

export function renderRow(text: string, index: number, isSelected: boolean) {
  return (
    <>
      <View
        style={[
          styles.dropDownStyleHalfWidth,
          { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }
        ]}>
        <Text style={[styles.textDropdown, isSelected ? fonts.semi_bold18 : fonts.regular18]} children={text} />
        {isSelected && (
          <FstImage
            source={R.images.ic_dropdown_selected}
            style={{ width: 18, height: 18 }}
            tintColor={colors.primary}
          />
        )}
      </View>
    </>
  );
}

const ModalDropdownComponent = React.forwardRef(
  (
    {
      nameAtr,
      onSelect,
      renderRow,
      data,
      defaultValue = R.strings().please_select,
      label,
      labelStyle,
      containerStyle,
      textStyle,
      showLine = false
    }: ModalDropdownProps,
    ref
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [indexSelected, setIndexSelected] = useState<number | any>(null);

    useImperativeHandle(ref, () => ({
      select(index: number) {
        setName('');
      }
    }));

    const toggleModal = useCallback(() => {
      setIsVisible(prevState => !prevState);
    }, []);

    const onSelectItem = useCallback((item: any, index: number) => {
      setName(item[nameAtr]);
      setIndexSelected(index);
      onSelect(index, item);
    }, []);

    return (
      <View style={[containerStyle, { flex: 1 }]}>
        {!!label && <Text style={[styles.label, labelStyle]} children={label} />}
        <DebounceButton
          onPress={toggleModal}
          style={[styles.dropDownStyleHalfWidth]}
          children={
            <Block direction="row" alignItems="center" justifyContent="space-between">
              <Text
                style={[styles.defaultValue, { color: name ? 'black' : 'rgb(159,152,146)' }, textStyle]}
                children={name || defaultValue}
              />
              <FstImage style={styles.imgRow} source={R.images.ic_dropdown} resizeMode="contain" />
            </Block>
          }
        />
        {showLine && <Divider />}
        <DropdownBottom
          data={data}
          renderItem={renderRow}
          isVisible={isVisible}
          toggleModal={toggleModal}
          indexSelected={indexSelected}
          onSelect={onSelectItem}
        />
      </View>
    );
  }
);

const ModalDropdown = memo(ModalDropdownComponent, isEqual);
export default ModalDropdown;
