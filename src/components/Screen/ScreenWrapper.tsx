import { ScreenWrapperProps } from './ScreenWrapper.props';
import { Block } from '../Block/Block';

import Error from '../Error/Error';
import Loading from '../Loading';
import LoadingProgress from '../LoadingProgress';
import RNHeader from '../RNHeader';
import isEqual from 'react-fast-compare';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { memo, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView as RNSafeArea, ScrollView, StyleSheet } from 'react-native';
import { enhance } from '#common';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  outer: {
    backgroundColor: 'transparent',
    flex: 1
  },
  insetBottom: {
    bottom: 0
  },
  insetLeft: {
    left: 0
  },
  insetRight: {
    right: 0
  },
  inner: {
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%'
  }
});
const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenWrapperProps) {
  const inset = useSafeAreaInsets();
  const style = props.style || {};
  const {
    statusColor = undefined,
    bottomInsetColor = '#ffffff',
    forceInset,
    unsafe,
    children,
    backgroundColor,
    leftInsetColor = '#ffffff',
    rightInsetColor = '#ffffff'
  } = props;

  const backgroundStyle = useMemo(() => (backgroundColor ? { backgroundColor } : {}), [backgroundColor]);

  const Wrapper = unsafe ? Block : SafeAreaView;

  return (
    <KeyboardAvoidingView style={[styles.outer]} behavior={isIos ? 'padding' : undefined} keyboardVerticalOffset={0}>
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('top'))) && isIos && (
        <Block color={statusColor} position="absolute" height={inset.top} width="100%" />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('left'))) && isIos && (
        <Block color={leftInsetColor} position="absolute" style={[styles.insetLeft]} width={inset.left} height="100%" />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('right'))) && isIos && (
        <Block
          color={rightInsetColor}
          position="absolute"
          style={[styles.insetRight]}
          width={inset.right}
          height="100%"
        />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('bottom'))) && isIos && (
        <Block
          color={bottomInsetColor}
          style={[styles.insetBottom]}
          position="absolute"
          height={inset.bottom}
          width="100%"
        />
      )}
      <Wrapper edges={forceInset ?? undefined} style={[styles.inner, style, backgroundStyle]}>
        {children}
      </Wrapper>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenWrapperProps) {
  const inset = useSafeAreaInsets();
  const {
    showHorizontal = false,
    showVertical = false,
    statusColor = undefined,
    bottomInsetColor = '#ffffff',
    backgroundColor,
    style = {},
    forceInset,
    unsafe = false,
    children,
    leftInsetColor = '#ffffff',
    rightInsetColor = '#ffffff'
  } = props;

  const backgroundStyle = useMemo(() => (backgroundColor ? { backgroundColor } : {}), [backgroundColor]);

  const actualStyle = useMemo(() => enhance([style]), [style]);

  const Wrapper = unsafe ? Block : SafeAreaView;
  return (
    <KeyboardAvoidingView style={[styles.root]} behavior={isIos ? 'padding' : undefined} keyboardVerticalOffset={0}>
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('top'))) && isIos && (
        <Block color={statusColor} position="absolute" height={inset.top} width="100%" />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('left'))) && isIos && (
        <Block color={leftInsetColor} position="absolute" style={[styles.insetLeft]} width={inset.left} height="100%" />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('right'))) && isIos && (
        <Block
          color={rightInsetColor}
          position="absolute"
          style={[styles.insetRight]}
          width={inset.right}
          height="100%"
        />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('bottom'))) && isIos && (
        <Block
          color={bottomInsetColor}
          style={[styles.insetBottom]}
          position="absolute"
          height={inset.bottom}
          width="100%"
        />
      )}
      <Wrapper edges={forceInset ?? undefined} style={[styles.inner]} block>
        <Block block>
          <ScrollView
            showsVerticalScrollIndicator={showVertical}
            showsHorizontalScrollIndicator={showHorizontal}
            keyboardShouldPersistTaps="handled"
            style={[styles.outer, backgroundStyle]}
            contentContainerStyle={actualStyle}>
            {children}
          </ScrollView>
        </Block>
      </Wrapper>
    </KeyboardAvoidingView>
  );
}

function ScreenWrapperComponent(props: ScreenWrapperProps) {
  const { scroll = false, titleHeader, rightComponent, leftComponent, back = false, dialogLoading, unsafe } = props;
  const renderBody = () => {
    const { isLoading, isError, reload } = props;
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <Error reload={reload} />;
    }
    return <>{scroll ? <ScreenWithScrolling {...props} /> : <ScreenWithoutScrolling {...props} />}</>;
  };
  return (
    <Block style={[styles.root]} color={props.backgroundColor}>
      {!!titleHeader && (
        <RNHeader titleHeader={titleHeader} back={back} rightComponent={rightComponent} leftComponent={leftComponent} />
      )}
      {!unsafe ? <RNSafeArea style={{ flex: 1 }}>{renderBody()}</RNSafeArea> : renderBody()}
      {dialogLoading && <LoadingProgress />}
    </Block>
  );
}

const ScreenWrapper = memo(ScreenWrapperComponent, isEqual);
export default ScreenWrapper;