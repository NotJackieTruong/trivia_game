import isEqual from 'react-fast-compare';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';

import React, { memo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { dimensions } from '#theme/dimensions';

const { width } = dimensions;

const styles = StyleSheet.create({});

interface VideoItemProps {
  item: any;
  style?: any;
}

interface OnProgressData {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
  duration: number;
}

declare enum PLAYER_STATES_TYPE {
  PLAYING = 0,
  PAUSED = 1,
  ENDED = 2
}

const VideoItemComponent = ({ item, style }: VideoItemProps) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [screenType, setScreenType] = useState('content');

  const onSeek = (seek: number) => {
    // Handler for change in seekbar
    if (videoPlayer && videoPlayer.current) {
      videoPlayer.current.seek(seek);
    }
  };

  const onPaused = (playerState: PLAYER_STATES_TYPE) => {
    // Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    // Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    if (videoPlayer && videoPlayer.current) {
      videoPlayer.current.seek(0);
    }
  };

  const onProgress = (data: OnProgressData) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: OnProgressData) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const exitFullScreen = () => {
    //   alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType === 'content') {
      setScreenType('cover');
    } else {
      setScreenType('content');
    }
  };

  const onSeeking = (currentTime: number) => setCurrentTime(currentTime);
  return (
    <>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode="cover"
        onFullScreen={isFullScreen}
        source={{ uri: item.url || item.uri }}
        style={[{ width, aspectRatio: 1 }, style]}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
      />
    </>
  );
};

const VideoItem = memo(VideoItemComponent, isEqual);
export default VideoItem;
