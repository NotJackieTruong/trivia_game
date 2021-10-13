import { DropdownBottomProps } from './ModalDropdown.props';
import { styles } from './styles';

import { DebounceButton, Divider } from '..';
import { Block } from '../Block/Block';

import Modal from 'react-native-modal';

import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { dimensions } from '#theme';

const { width } = dimensions;

interface State {
  indexSelected: number | undefined;
}

export class DropdownBottom extends Component<DropdownBottomProps, State> {
  state = {
    indexSelected: this.props.indexSelected
  };

  renderItemDropdown = ({ item, index }: { item: any; index: number }) => {
    const { renderItem, toggleModal, onSelect } = this.props;
    return (
      <DebounceButton
        style={{
          flex: 1
        }}
        onPress={() => {
          this.setState({ indexSelected: index }, () => {
            onSelect(item, index);
            toggleModal();
          });
        }}
        children={<>{renderItem(item, index, this.state.indexSelected === index)}</>}
      />
    );
  };

  render() {
    const { data, isVisible, toggleModal } = this.props;
    return (
      <Modal
        onModalHide={() => {}}
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        style={[styles.containerModal]}
        // animationIn='fadeIn'
        // animationOut='fadeOut'
        // animationInTiming={100}
        // animationOutTiming={100}
        // backdropTransitionInTiming={100}
        // backdropTransitionOutTiming={100}
      >
        <Block
          children={
            <>
              <FlatList
                style={styles.containerList}
                data={data}
                renderItem={this.renderItemDropdown}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <Divider style={{ width: width * 0.95, alignSelf: 'center' }} />}
              />

              {/* <DebounceButton
                onPress={() => {
                  const item = data.find((value, index) => index === this.state.indexSelected);
                  onSelect(item, this.state.indexSelected);
                  toggleModal();
                }}
                style={styles.containerConfirm}
                children={<Text style={styles.txtConfirm} children='Xác nhận' />}
              /> */}
            </>
          }
        />
      </Modal>
    );
  }
}
