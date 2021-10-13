import { styles } from './Select.preset';
import { SelectOption, SelectProps } from './Select.props';
import { SelectItem } from './SelectItem';

import { Block } from '../Block/Block';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import equals from 'react-fast-compare';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import React, { memo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

const SelectComponent = (props: SelectProps) => {
  const inset = useSafeAreaInsets();
  const {
    onPress,
    textItemStyle,
    rightChildren,
    useBottomInset = true,
    defaultSelect = 'Select',
    customItem = undefined,
    data = [],
    ...rest
  } = props;
  const [selectedText, setSelectedText] = useState(defaultSelect);
  const [visible, setVisible] = useState(false);
  const onPressOption = (item: SelectOption, index: number) => {
    setVisible(false);
    setSelectedText(item.text);
    onPress && onPress(item, index);
  };
  const _showDrop = () => {
    setVisible(true);
  };
  const _hideDrop = () => {
    setVisible(false);
  };
  const _renderItem = ({ item, index }: ListRenderItemInfo<SelectOption>) => (
    <SelectItem
      customItem={customItem}
      textItemStyle={textItemStyle}
      onPress={onPressOption}
      item={item}
      index={index}
    />
  );
  const _keyExtractor = (item: SelectOption) =>
    item.text +
    new Date().getTime().toString() +
    Math.floor(Math.random() * Math.floor(new Date().getTime())).toString();
  return (
    <>
      <Block style={[styles.root]} collapsable={false}>
        <Button onPress={_showDrop} activeOpacity={0.68} preset="link" style={[styles.buttonDrop]}>
          <Block style={[styles.row]}>
            <Text style={[]} text={selectedText} />
            {rightChildren && rightChildren}
          </Block>
        </Button>
        <Modal
          onBackdropPress={_hideDrop}
          onBackButtonPress={_hideDrop}
          style={[styles.modal]}
          backdropOpacity={0.3}
          useNativeDriver={true}
          isVisible={visible}>
          <Block style={[styles.wrap]}>
            <Block style={[styles.wrapList, { paddingBottom: useBottomInset ? inset.bottom : 0 }]}>
              <FlatList data={data} keyExtractor={_keyExtractor} renderItem={_renderItem} {...rest} />
            </Block>
          </Block>
        </Modal>
      </Block>
    </>
  );
};
export const Select = memo(SelectComponent, equals);
