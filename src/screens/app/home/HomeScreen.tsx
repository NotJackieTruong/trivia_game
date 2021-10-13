import isEqual from 'react-fast-compare';
import React, { memo, useCallback, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import R from '#assets';
import {
  ActionSheet,
  ActionSheetRef,
  Block,
  Button,
  CheckBox,
  Divider,
  DropDown,
  FAB,
  HelperText,
  LightBox,
  Otp,
  Progress,
  RadioButton,
  Select,
  Slider,
  Spacer,
  Switch,
  TextField,
  TouchableScale
} from '#components';
import ScreenWrapper from '#components/Screen/ScreenWrapper';

const styles = StyleSheet.create({});

interface HomeScreenProps {}
const HomeScreenComponent = ({}: HomeScreenProps) => {
  const _refAction = useRef<ActionSheetRef>();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<boolean>(false);
  const [progress] = useState(10);
  const [sliderProgress, setSliderProgress] = useState<number>(0);
  const [sliderRangeProgress, setSliderRangeProgress] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });
  const _onShowAction = useCallback(() => {
    if (_refAction.current) {
      _refAction.current.show();
    }
  }, []);
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      {/* <Wallpaper /> */}
      <ScreenWrapper
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        scroll={true}
        backgroundColor={'transparent'}>
        <Block width={150} height={150}>
          <LightBox source={{ uri: 'https://picsum.photos/id/11/400/400' }} />
        </Block>

        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Action Sheet</Text>
          <Spacer width={10} />
          <Button onPress={_onShowAction}>
            <Text>Show Action</Text>
          </Button>
          <ActionSheet ref={_refAction} title={'Select'} option={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Check box</Text>
          <Spacer width={10} />
          <CheckBox onToggle={setVisible} value={visible} tx="Hello" />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>OTP</Text>
          <Spacer width={10} />
          <Otp length={5} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>DropDown</Text>
          <Spacer width={10} />
          <DropDown
            data={[
              { label: 'Option1', value: 1 },
              { label: 'Option2', value: 2 }
            ]}
          />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Select</Text>
          <Spacer width={10} />
          <Select data={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Helper text</Text>
          <Spacer width={10} />
          <Block>
            <HelperText visible={visible} msg={'Helper text'} type={'error'} />
            <HelperText visible={visible} msg={'Helper text'} type={'info'} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Divider</Text>
          <Spacer width={10} />
          <Divider />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Progress Circle</Text>
          <Spacer width={10} />
          <Progress type={'circle'} progress={progress} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Progress Line</Text>
          <Spacer width={10} />
          <Progress type={'linear'} progress={progress} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Radio Button</Text>
          <Spacer width={10} />
          <RadioButton value={selectedRadio} onToggle={setSelectedRadio} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Slider Linear</Text>
          <Spacer width={10} />
          <Block block>
            <Text>{sliderProgress}</Text>
            <Slider type={'linear'} onChangeLinear={setSliderProgress} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Slider Range</Text>
          <Spacer width={10} />
          <Block block>
            <Text>
              {sliderRangeProgress.lower} - {sliderRangeProgress.upper}
            </Text>
            <Spacer height={20} />
            <Slider type={'range'} onChangeRange={setSliderRangeProgress} initialRange={[0, 50]} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Flat</Text>
          <Spacer width={10} />
          <TextField label={'Flat'} typeInput={'flat'} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Outline</Text>
          <Spacer width={10} />
          <TextField typeInput={'outline'} label={'Outline'} />
        </Block>
        <Spacer height={10} />
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TouchableScale</Text>
          <Spacer width={10} />
          <TouchableScale
            onPress={() => {
              console.log('123');
            }}>
            <Block padding={5} color={'#bbb'}>
              <Text>Press me!</Text>
            </Block>
          </TouchableScale>
        </Block>
        <Spacer height={10} />
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Switch IOS</Text>
          <Spacer width={10} />
          <Switch />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Switch Android</Text>
          <Spacer width={10} />
          <Switch type={'android'} />
        </Block>
        {/* <FormLogin onSubmit={_onSubmit} /> */}
      </ScreenWrapper>
      <FAB
        label="Float"
        type={'group'}
        actions={[
          { icon: R.images.ic_commerce, label: 'Icon1' },
          { icon: R.images.ic_home, label: 'Icon2' },
          { icon: R.images.ic_notify, label: 'Icon3' }
        ]}
      />
    </Block>
  );
};

const HomeScreen = memo(HomeScreenComponent, isEqual);
export default HomeScreen;
