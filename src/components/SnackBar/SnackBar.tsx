import { SnackItem } from './SnackBarItem';
import { DURATION_HIDE } from './constants';
import { Item, SnackBarProps, TypeMessage } from './type';

import isEqual from 'react-fast-compare';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    paddingHorizontal: 15
  }
});

const SnackBarComponent = forwardRef((props: SnackBarProps, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: ({
        interval = DURATION_HIDE,
        msg,
        type = 'success'
      }: {
        msg: string;
        interval: number;
        type: TypeMessage;
      }) => {
        setData(d =>
          d.concat([
            {
              id: new Date().getTime(),
              msg,
              type,
              interval
            }
          ])
        );
      }
    }),
    []
  );

  // state
  const [data, setData] = useState<Item[]>([]);
  const inset = useSafeAreaInsets();
  // function
  const onPop = useCallback((item: Item) => {
    setData(d => d.filter(x => x.id !== item.id));
  }, []);

  const renderItem = useCallback(
    (item: Item) => <SnackItem key={item.id} {...{ item, onPop }} {...props} />,
    [onPop, props]
  );

  // render
  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, styles.container, { marginTop: inset.top }]}>
      {data.map(renderItem)}
    </View>
  );
});
export type SnackBarRef = {
  show: (data: { msg: string; interval?: number; type?: TypeMessage }) => void;
};
export const SnackBar = memo(SnackBarComponent, isEqual);
