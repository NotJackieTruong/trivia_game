import { FastImageProps, Source } from 'react-native-fast-image';

type AvatarProps = FastImageProps & { onPress?: () => void; source?: Source | number };
export type { AvatarProps };
