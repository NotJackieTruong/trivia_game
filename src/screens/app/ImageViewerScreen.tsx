import isEqual from 'react-fast-compare';
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';

import React, { memo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { DebounceButton } from '#components';
import FstImage from '#components/FstImage/FstImage';
import NavigationUtil from '#navigation';

interface ImageViewerScreenProps {}

const styles = StyleSheet.create({
  btnClose: {
    position: 'absolute',
    top: 35,
    left: 10,
    backgroundColor: 'rgba(225,225,225,0.6)',
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: { width: '100%', height: '97%', alignSelf: 'center' },
  containerImage: {
    flexDirection: 'column-reverse',
    flex: 1
  }
});

interface ImageViewerScreenProps {
  route: any;
  navigation: any;
}

const ImageViewerScreenComponent = ({ route, navigation }: ImageViewerScreenProps) => {
  var { url, index } = route.params;
  const [state, setState] = useState({
    index: index || 0,
    images: Array.isArray(images) ? images : url ? [url] : [],
    loading: true
  });
  var images = route.params.images.filter((value: any) => !value.isVideo);
  var index =
    route.params.images.length > images.length && index === route.params.images.length - 1 ? index - 1 : index;
  return (
    <>
      <ImageViewer
        imageUrls={images}
        onChange={index => {
          setState({
            ...state,
            index
          });
        }}
        enablePreload
        swipeDownThreshold={200}
        onSwipeDown={NavigationUtil.goBack}
        loadingRender={() => <ActivityIndicator />}
        renderImage={props => (
          <View style={styles.containerImage}>
            <FstImage {...props} style={styles.image} resizeMode="contain" />
          </View>
        )}
        index={index}
      />

      <DebounceButton style={styles.btnClose} onPress={NavigationUtil.goBack}>
        <Icon type="ion-icon" name="close" size={30} color="black" />
      </DebounceButton>
    </>
  );
};

const ImageViewerScreen = memo(ImageViewerScreenComponent, isEqual);
export default ImageViewerScreen;
