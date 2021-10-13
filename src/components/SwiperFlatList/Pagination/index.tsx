import { colors, horizontal } from '../theme';

import PropTypes from 'prop-types';

import React from 'react';
import { Animated, StyleProp, StyleSheet, TouchableOpacity, ViewPropTypes, ViewStyle } from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies

import { colors as colorsDefault } from '#theme/colors';

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // flexDirection: 'row',
    // marginVertical: vertical.xxSmall,
    // justifyContent: 'center',
    // bottom: 0,
    // width: '100%'
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  // eslint-disable-next-line react-native/no-unused-styles
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colorsDefault.primary,
    marginHorizontal: 4
  }
});

const Pagination = ({
  size,
  paginationStyle,
  scrollX,
  windowWidth,
  renderPagination,
  scrollToIndex
}: {
  size: number;
  paginationStyle: StyleProp<ViewStyle>;
  scrollX: any;
  windowWidth: number;
  renderPagination: any;
  scrollToIndex: any;
}) => {
  if (renderPagination) {
    return renderPagination(scrollX);
  }
  return (
    <Animated.View style={[styles.container, paginationStyle]}>
      {Array.from({ length: size }).map((_, index) => {
        const width = scrollX.interpolate({
          inputRange: [windowWidth * (index - 1), windowWidth * index, windowWidth * (index + 1)],
          outputRange: [8, 16, 8],
          extrapolate: 'clamp'
        });
        return (
          <TouchableOpacity key={index} onPress={() => scrollToIndex({ index })}>
            <Animated.View style={[styles.normalDot, { width }]} />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};
Pagination.propTypes = {
  scrollToIndex: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  paginationIndex: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  paginationActiveColor: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  paginationDefaultColor: PropTypes.string,
  paginationStyle: ViewPropTypes.style,
  // eslint-disable-next-line react/no-unused-prop-types
  paginationStyleItem: ViewPropTypes.style
};

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: colors.white,
  paginationDefaultColor: colors.gray,
  paginationStyle: {},
  paginationStyleItem: {}
};

export default Pagination;
