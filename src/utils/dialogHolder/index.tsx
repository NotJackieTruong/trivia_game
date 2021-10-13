import { createRef } from 'react';

import { ProgressDialogRef, SnackBarRef } from '#components';
import { ImageTransitionRef } from '#components/LightBox/ImageTransition';
import { TypeMessage } from '#components/SnackBar/type';

export const dialogHolder = createRef<ProgressDialogRef>();
export const snackBarHolder = createRef<SnackBarRef>();
export const imageTransitionHolder = createRef<ImageTransitionRef>();

export const showLoading = (msg = 'Đang xử lý') => {
  dialogHolder.current?.show(msg);
};

export const hideLoading = () => {
  dialogHolder.current?.hide();
};

export const showSnack = ({ msg, interval, type }: { msg: string; interval?: number; type?: TypeMessage }) => {
  snackBarHolder.current?.show({ msg, interval, type });
};
