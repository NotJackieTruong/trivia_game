import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface DropdownBottomProps {
  data: Array<any>;
  renderItem: (item: any, index: number, isSelected: boolean) => void;
  isVisible: boolean;
  toggleModal: () => void;
  indexSelected?: number;
  onSelect: (item: any, index: number) => void;
  styleContainerDropdown?: StyleProp<ViewStyle>;
}

export interface ModalDropdownProps {
  /**
   * Hàm được gọi khi click item trong Dropdown
   */
  onSelect: (index: number, item: any) => void | undefined;
  /**
   * Hiển thị View chứa item trong Dropdown
   */
  renderRow: (item: object, index: number, isSelected: boolean) => void;
  /**
   * Xuất hiện khi click item trong dropdown
   */
  data: any[];
  styleContainerDropdown?: StyleProp<ViewStyle>;
  defaultValue?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  showLine?: boolean;
  label?: string;
  nameAtr: string;
  keyExtractor?: string;
  btnStyle?: StyleProp<ViewStyle>;
}
