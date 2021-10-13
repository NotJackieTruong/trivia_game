import { Platform, StyleSheet } from 'react-native';

import { colors, dimensions, fonts } from '#theme';

const { width, height } = dimensions;
export const styles = StyleSheet.create({
  label: {
    ...fonts.regular12,
    marginTop: 5,
    color: 'rgb(159,152,146)'
  },
  defaultValue: {
    ...fonts.regular14,
    color: 'rgb(159,152,146)'
  },
  containerModal: {
    width,
    position: 'absolute',
    left: -20,
    bottom: 0
  },
  textStyle: {
    ...fonts.semi_bold16,
    textAlignVertical: 'center'
  },
  dropDownStyleHalfWidth: {
    paddingVertical: 14,
    paddingHorizontal: 2
  },
  iconCheck: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 30
  },
  textDropdown: {
    ...fonts.regular18
    // flex: 1,
    // textAlign: 'center'
  },
  container: {
    width: width - 10
  },
  dropdownStyle: {
    width,
    borderWidth: 0.2,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: Platform.OS === 'android' ? 3 : 0,
    borderColor: 'white'
  },
  txtConfirm: {
    ...fonts.semi_bold16,
    color: colors.primary
  },
  containerConfirm: {
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10
  },
  containerList: {
    // height: height / 3,
    backgroundColor: 'white',
    borderRadius: 10
  },
  imgRow: { width: 10, height: 10, marginLeft: 4 }
});
