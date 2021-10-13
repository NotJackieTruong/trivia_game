import { BACKGROUND_TOAST, showToast } from './ToastHelper';
// eslint-disable-next-line react-native/split-platform-components
import { hideLoading, showLoading } from './dialogHolder';

import { default as ImagePickerMulti } from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import MovToMp4 from 'react-native-mov-to-mp4';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import R from '#assets';
import { colors } from '#theme';

const maxWidth = Dimensions.get('screen').width;
const maxHeight = Dimensions.get('screen').height;

const MAX_WIDTH_IMAGE = 1000;
const MAX_HEIGHT_IMAGE = 1000;
const MAX_IMAGE_LENGTH = 5;
const MAX_SECOND_VIDEO = 60;

const imagePickerHelper = async (res: string) => {
  if (Platform.OS !== 'ios') {
    const isRead = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE');
    const isWrite = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE');
    const isGrantCamera = await PermissionsAndroid.check('android.permission.CAMERA');
    if (isRead && isWrite && isGrantCamera) {
      startPickImage(res);
    } else {
      PermissionsAndroid.requestMultiple([
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.CAMERA'
      ]).finally(() => {
        imagePickerHelper(res);
      });
    }
  } else {
    startPickImage(res);
  }
};

const startPickImage = (res: any) => {
  const options = {
    title: R.strings().select_image,
    cancelButtonTitle: R.strings().cancel,
    chooseFromLibraryButtonTitle: R.strings().from_library,
    takePhotoButtonTitle: R.strings().take_photo,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    },
    tintColor: colors.black,
    maxHeight: MAX_HEIGHT_IMAGE,
    maxWidth: MAX_WIDTH_IMAGE
  };
  try {
    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let actualWidth = response.width,
          actualHeight = response.height;
        let imgRatio = actualWidth / actualHeight;
        const maxRatio = 1;
        if (actualHeight > maxHeight || actualWidth > maxWidth) {
          if (imgRatio < maxRatio) {
            imgRatio = maxHeight / actualHeight;
            actualWidth = imgRatio * actualWidth;
            actualHeight = maxHeight;
          } else if (imgRatio > maxRatio) {
            imgRatio = maxWidth / actualWidth;
            actualHeight = imgRatio * actualHeight;
            actualWidth = maxWidth;
          } else {
            actualHeight = maxHeight;
            actualWidth = maxWidth;
          }
        }

        const uri = Platform.OS === 'android' ? response.uri : response.uri.replace('file://', '');
        await _resizeImage(uri, actualWidth, actualHeight, res);
      }
    });
  } catch (error) {
    console.log(`select image err: ${JSON.stringify(error)}`);
  }
};

const _resizeImage = async (uri: string, actualWidth: number, actualHeight: number, res: any) => {
  let url = null;
  try {
    const response = await ImageResizer.createResizedImage(uri, actualWidth, actualHeight, 'JPEG', 70, 0);
    console.log('resize success');
    url = response.uri;
  } catch (error) {
    console.log(`resize err: ${error}`);
    url = uri;
  }
  if (typeof res) {
    res(url);
  }
};

const startMultiImagePicker = (res: any, curLength: number) => {
  const maxImageSelect = curLength <= MAX_IMAGE_LENGTH ? MAX_IMAGE_LENGTH - curLength : 0;
  if (maxImageSelect === 0) {
    showToast(`Tối đa ${MAX_IMAGE_LENGTH} ảnh`, BACKGROUND_TOAST.FAIL);
    return;
  }
  ImagePickerMulti.openPicker({
    width: MAX_WIDTH_IMAGE,
    height: MAX_HEIGHT_IMAGE,
    multiple: true,
    // cropping: true,
    maxFiles: maxImageSelect
  }).then(image => {
    res(image);
    console.log(image);
  });
};

export const multiPickerHelper = async (curLength = 0, res: any) => {
  if (Platform.OS !== 'ios') {
    const isRead = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE');
    const isWrite = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE');
    const isGrantCamera = await PermissionsAndroid.check('android.permission.CAMERA');
    if (isRead && isWrite && isGrantCamera) {
      startMultiImagePicker(curLength, res);
    } else {
      PermissionsAndroid.requestMultiple([
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.CAMERA'
      ]).finally(() => {
        multiPickerHelper(res, curLength);
      });
    }
  } else {
    startMultiImagePicker(res, curLength);
  }
};

const convertFileToMp4 = async (uri: string) => {
  showLoading();
  const filename = Date.now().toString();
  MovToMp4.convertMovToMp4(uri, filename)
    .then((results: string) => {
      hideLoading();
      return results;
    })
    .catch((error: any) => hideLoading());
};

const startTakeVideo = (res: any) => {
  const options = {
    mediaType: 'video',
    videoQuality: 'high',
    durationLimit: MAX_SECOND_VIDEO,
    cameraType: 'back',
    storageOptions: {
      // path: 'video'
    }
  };
  ImagePicker.launchCamera(options, async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      if (Platform.OS === 'ios') {
        res(convertFileToMp4(response.uri));
      } else {
        res(response.uri);
      }
    }
  });
};

export const takeVideoPicker = async (res: any) => {
  if (Platform.OS !== 'ios') {
    const isRead = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE');
    const isWrite = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE');
    const isGrantCamera = await PermissionsAndroid.check('android.permission.CAMERA');
    if (isRead && isWrite && isGrantCamera) {
      startTakeVideo(res);
    } else {
      PermissionsAndroid.requestMultiple([
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.CAMERA'
      ]).finally(() => {
        takeVideoPicker(res);
      });
    }
  } else {
    startTakeVideo(res);
  }
};

const startVideoPicker = (res: any) => {
  const options = {
    title: 'Video Picker',
    mediaType: 'video',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  ImagePicker.launchImageLibrary(options, async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      if (Platform.OS === 'ios') {
        res(convertFileToMp4(response.uri));
      } else {
        res(response.uri);
      }
    }
  });
};

export const videoLibraryPicker = async (res: any) => {
  if (Platform.OS !== 'ios') {
    const isRead = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE');
    const isWrite = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE');
    const isGrantCamera = await PermissionsAndroid.check('android.permission.CAMERA');
    if (isRead && isWrite && isGrantCamera) {
      startVideoPicker(res);
    } else {
      PermissionsAndroid.requestMultiple([
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.CAMERA'
      ]).finally(() => {
        videoLibraryPicker(res);
      });
    }
  } else {
    startVideoPicker(res);
  }
};

export default imagePickerHelper;
