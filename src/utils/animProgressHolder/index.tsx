import { createRef } from 'react';

import { AnimProcessRef } from '#components/AnimProgress/AnimProgress';

export const animProgressHolder = createRef<AnimProcessRef>();

export const showLoadingAnim = () => {
  animProgressHolder.current?.show();
};

export const hideLoadingAnim = () => {
  animProgressHolder.current?.hide();
};
