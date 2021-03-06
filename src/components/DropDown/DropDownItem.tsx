import { ItemProps } from './DropDown.props';

import { Block } from '../Block/Block';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

import isEqual from 'react-fast-compare';

import React, { memo, useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { enhance } from '#common';

const styles = StyleSheet.create({
  labelStyle: {
    flex: 1,
    paddingRight: 5
  },
  container: {
    alignItems: 'center'
  },
  wrapIcon: {
    minHeight: 24
  }
});

const DropDownItemComponent = ({
  item,
  onPressItem,
  selected = false,
  activeItemStyle,
  activeLabelStyle,
  containerStyleItem,
  customTickIcon,
  labelStyle
}: ItemProps) => {
  const _onItemPress = useCallback(() => {
    onPressItem && item && onPressItem(item.value ?? '');
  }, [item, onPressItem]);

  const activeContainer = useMemo(() => enhance([activeItemStyle]) as StyleProp<ViewStyle>, [activeItemStyle]);
  const activeLabel = useMemo(() => enhance([activeLabelStyle]) as StyleProp<ViewStyle>, [activeLabelStyle]);
  const label = useMemo(
    () => enhance([styles.labelStyle, labelStyle, selected && activeLabel]) as StyleProp<ViewStyle>,
    [activeLabel, labelStyle, selected]
  );
  const container = useMemo(
    () => enhance([styles.container, containerStyleItem, selected && activeContainer]) as StyleProp<ViewStyle>,
    [activeContainer, containerStyleItem, selected]
  );
  return (
    <Button onPress={_onItemPress} preset="link">
      <Block width="100%" paddingVertical={5} direction="row" style={[container]}>
        <Text style={[label]}>{item.label}</Text>
        <Block style={[styles.wrapIcon]}>
          {selected && (customTickIcon ? customTickIcon() : <Icon icon="check" />)}
        </Block>
      </Block>
    </Button>
  );
};

export const DropDownItem = memo(DropDownItemComponent, isEqual);
