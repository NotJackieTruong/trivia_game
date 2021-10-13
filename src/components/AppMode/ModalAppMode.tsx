import { Block } from '../Block/Block';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { Icon } from '../Icon/Icon';
import { Spacer } from '../Spacer/Spacer';
import { Text } from '../Text/Text';

import isEqual from 'react-fast-compare';
import Modal from 'react-native-modal';

import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppModeType } from '#api';
import R from '#assets';
import { dispatch, useSelector } from '#common';
import { APP_MODE, STRING_VALUE } from '#config';
import { onSetAppMode } from '#redux/modeSlice';
import { saveString } from '#storage';
import { fonts } from '#theme';

const styles = StyleSheet.create({
  modal: {
    marginVertical: 0,
    marginHorizontal: 0
  },
  contentModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: 'center'
  },
  textMode: {
    flex: 1,
    ...fonts.regular12
  },
  title: {
    ...fonts.regular14,
    paddingVertical: 0
  }
});
interface ButtonSelectProps {
  tx: string;
  mode: AppModeType;
  onPress?: (mode: AppModeType) => void;
  icon: number;
  selected: boolean;
}
const ButtonSelect = ({ tx, mode, icon, onPress, selected = false }: ButtonSelectProps) => {
  // function
  const _onPress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(mode);
    }
  }, [mode, onPress]);

  // render
  return (
    <Button onPress={_onPress} preset="link">
      <Block direction="row" paddingHorizontal={10} justifyContent="center" middle>
        <Icon {...{ icon }} source={icon} />
        <Spacer width={10} />
        <Text numberOfLines={1} style={[styles.textMode]} {...{ tx }} />
        {selected && <Icon source={R.images.ic_check} />}
      </Block>
    </Button>
  );
};

const Spacing = () => (
  <>
    <Spacer height={10} />
    <Divider />
    <Spacer height={10} />
  </>
);
const ModalAppModeComponent = forwardRef((_: any, ref: any) => {
  // state
  const { appMode } = useSelector(x => x.modeSlice);
  const [isVisible, setIsVisible] = useState(false);

  // function
  const _hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const _onButtonPress = useCallback(
    async (mode: AppModeType) => {
      _hideModal();
      await saveString(STRING_VALUE.APP_MODE, mode);
      dispatch(onSetAppMode(mode));
    },
    [_hideModal]
  );

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setIsVisible(true);
      },
      hide: () => {
        _hideModal();
      }
    }),
    [_hideModal]
  );

  // render
  return (
    <Modal
      style={[styles.modal]}
      useNativeDriver={true}
      onBackdropPress={_hideModal}
      onBackButtonPress={_hideModal}
      isVisible={isVisible}>
      <Block block justifyContent="flex-end">
        <Block style={[styles.contentModal]}>
          <Text style={[styles.title]} tx="common:textAppMode" />
          <ButtonSelect
            selected={appMode === APP_MODE.DEV}
            icon={R.images.ic_app_dev}
            onPress={_onButtonPress}
            mode={APP_MODE.DEV as AppModeType}
            tx="common:textAppDev"
          />
          <Spacing />
          <ButtonSelect
            selected={appMode === APP_MODE.STAGING}
            icon={R.images.ic_app_test}
            onPress={_onButtonPress}
            mode={APP_MODE.STAGING as AppModeType}
            tx="common:textAppTest"
          />
          <Spacing />
          <ButtonSelect
            selected={appMode === APP_MODE.PROD}
            icon={R.images.ic_app_prod}
            onPress={_onButtonPress}
            mode={APP_MODE.PROD as AppModeType}
            tx="common:textAppProd"
          />
        </Block>
      </Block>
    </Modal>
  );
});

export const ModalAppMode = memo(ModalAppModeComponent, isEqual);
export interface ModalAppModeRef {
  show(): void;
  hide(): void;
}
