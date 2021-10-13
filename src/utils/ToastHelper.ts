import Toast from 'react-native-root-toast';

import { colors } from '#theme';

export const showToast = (message: string, background?: string) => {
  Toast.show(message || 'Thành công', {
    position: Toast.positions.CENTER,
    backgroundColor: (!!background && background) || BACKGROUND_TOAST.SUCCESS,
    containerStyle: {
      width: '90%'
    },
    animation: true
  });
};

const BACKGROUND_TOAST = {
  SUCCESS: 'black',
  FAIL: colors.error.dark
};

const POSITION_TOAST = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  CENTER: 'CENTER'
};

export { BACKGROUND_TOAST, POSITION_TOAST };
