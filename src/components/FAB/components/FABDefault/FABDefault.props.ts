import { Source } from 'react-native-fast-image';

import { ViewStyle } from 'react-native';

export interface FABDefaultProps {
  onPress?: () => void;

  style?: ViewStyle | ViewStyle[];

  icon?: Source | number;

  // eslint-disable-next-line no-undef
  label?: string | React.ReactNode;
}
