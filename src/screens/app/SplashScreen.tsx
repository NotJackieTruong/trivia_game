import codePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text } from 'react-native';

import R from '#assets';
import { Block } from '#components';
import { ROLE } from '#config';
import { SCREEN_ROUTER } from '#config/screenType';
import { navigateSwitch, onLoadAppEnd } from '#redux/modeSlice';
import { colors } from '#theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [isNeedUpdate, setNeedsUpdate] = useState<boolean>(false);
  const [progress, setProgress] = useState<{
    receivedBytes: number;
    totalBytes: number;
  }>({
    receivedBytes: 0,
    totalBytes: 1
  });

  const bootstrapAsync = async () => {
    // const role = await load(TYPE_STORAGE.ROLE);
    // const token = await load(TYPE_STORAGE.TOKEN);
    dispatch(
      navigateSwitch({
        role: ROLE.PROVIDER,
        switch: SCREEN_ROUTER.MAIN
      })
    );
    dispatch(onLoadAppEnd());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUpdate = async () => {
    codePush
      .checkForUpdate()
      .then(update => {
        if (!update) {
          bootstrapAsync();
        } else {
          codePush.sync(
            {
              updateDialog: null,
              installMode: codePush.InstallMode.IMMEDIATE
            },
            status => {
              // reactotron.log(status);
              if (
                status === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
                status === codePush.SyncStatus.CHECKING_FOR_UPDATE ||
                status === codePush.SyncStatus.SYNC_IN_PROGRESS ||
                status === codePush.SyncStatus.INSTALLING_UPDATE
              ) {
              } else {
              }
              if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
                codePush.allowRestart();
              }
            },
            progress => {
              setProgress(progress);
              setNeedsUpdate(true);
              // reactotron.log(progress);
            }
          );
        }
      })
      .catch(err => {
        console.log('error', err);
        codePush.allowRestart();
      });
    codePush.notifyAppReady();
  };

  useEffect(() => {
    if (__DEV__) bootstrapAsync();
    else checkUpdate();
  }, []);

  return (
    <Block block color={colors.white} alignItems="center" justifyContent="center">
      <Block
        children={
          <>
            <FastImage source={R.images.ic_logo} style={styles.icon} resizeMode="contain" />
            <Text style={[styles.txt]} />
            {isNeedUpdate && (
              <>
                <Progress.Bar
                  progress={progress.receivedBytes / progress.totalBytes}
                  height={height * 0.018}
                  width={width * 0.8}
                  color={colors.primary}
                  style={styles.containerProgress}
                />
                <Text
                  style={styles.txtSync}
                  children={`${R.strings().syncing_data} ${Math.round(
                    (progress.receivedBytes / progress.totalBytes) * 100
                  )}%`}
                />
              </>
            )}
          </>
        }
      />
      {!isNeedUpdate && <ActivityIndicator size="large" />}
    </Block>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: width * 0.7,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  txt: {
    fontSize: 34,
    lineHeight: 40,
    color: colors.primary,
    marginTop: 15
  },
  containerProgress: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 30
  },
  txtSync: {
    textAlign: 'center',
    fontFamily: R.fonts.san_semi_bold,
    fontSize: 14,
    marginVertical: 10,
    color: colors.purple.dark
  }
});

export default SplashScreen;
