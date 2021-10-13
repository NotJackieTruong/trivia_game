import { Block } from '../Block/Block';
import { Text } from '../Text/Text';

import equals from 'react-fast-compare';
import { UIActivityIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';

import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';

import { colors } from '#theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    marginVertical: 0
  },
  contentModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMsg: {
    color: '#333333',
    fontSize: 14,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  textMsgIOS: {
    color: '#333333',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  row: { flexDirection: 'row' },
  column: {
    flexDirection: 'column'
  },
  wrapDialogRow: {
    width: width - 32,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF'
  },
  wrapDialogColumn: {
    padding: 20,
    paddingHorizontal: 35,
    overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.87)'
  }
});

const ProgressDialogComponent = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: (msg: string) => {
        setMessage(msg);
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      }
    }),
    []
  );
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const _onModalHide = () => {
    setMessage('');
  };
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      onModalHide={_onModalHide}
      animationIn="fadeIn"
      style={[styles.modal]}
      animationOut="fadeOut">
      <Block style={[styles.contentModal]}>
        <Block
          style={[
            Platform.OS === 'android' ? styles.wrapDialogRow : styles.wrapDialogColumn,
            { backgroundColor: 'white' }
          ]}>
          {/* <ActivityIndicator color={Platform.OS === 'android' ? colors.primary : '#ffffff'} /> */}
          <Block height={40}>
            <UIActivityIndicator color={colors.primary} />
          </Block>
          {message && (
            <Text font="semi_bold14" style={[Platform.OS === 'android' ? styles.textMsg : styles.textMsgIOS]}>
              {message}
            </Text>
          )}
        </Block>
      </Block>
    </Modal>
  );
});
export const ProgressDialog = memo(ProgressDialogComponent, equals);
export interface ProgressDialogRef {
  show(msg: string): void;
  hide(): void;
}
