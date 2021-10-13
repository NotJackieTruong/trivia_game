import { Source } from 'react-native-fast-image';

import { ViewStyle } from 'react-native';

export interface Actions {
  icon: Source | number;

  label?: string;

  onPress?: () => void;
}

export interface FABGroupProps {
  style?: ViewStyle | ViewStyle[];

  icon?: Source | number;

  label?: string | React.ReactNode;

  actions?: Actions[];
}
