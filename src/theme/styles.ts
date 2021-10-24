import { colors } from './colors';
import { spacing } from './spacing';

export const globalStyles = {
  wrap: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  block: { flex: 1 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  },
  rightIcon: {
    width: 22,
    height: 22
  },
  divider: { marginTop: spacing.smaller },
  inputHeight: 40
};
