import { Column } from './Column';
import { DEFAULT_COLUMNS, DEFAULT_CELL_SPACE } from './constants';
import { assignObjectColumn, assignObjectIndex, onCheckNumber, containMatchingUri } from './handle';
import { MasonryProps, Dimensions, ItemColumn, DataType } from './types';

import isEqual from 'react-fast-compare';

import React, { memo, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, LayoutChangeEvent, Image, RefreshControl } from 'react-native';

const MasonryComponent = ({
  data = [],
  containerImageStyle,
  customRenderItem,
  refreshColor,
  canRefresh = false,
  onRefresh,
  refreshing = false,
  onEndReach,
  columns = DEFAULT_COLUMNS,
  space = DEFAULT_CELL_SPACE,
  onPress,
  renderFooter,
  renderHeader
}: MasonryProps) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0
  });
  const [dataSource, setDataSource] = useState<Array<ItemColumn[]>>([]);
  const [oldColumn, setOldColumn] = useState<number>(columns);
  const [oldData, setOldData] = useState<DataType[]>([]);
  /**
   * Convert data to multi array to multi column
   */
  const _formatData = (_data: DataType[], _columns: number, isChangeColumn = false, offset = 0) => {
    if (_data.length <= 0 || _columns <= 0) {
      setDataSource([]);
      return;
    }

    let newData: Array<ItemColumn[]> = isChangeColumn ? [] : dataSource;

    const dataOf = _data
      .map((cell, index) => assignObjectColumn(_columns, index, cell))
      .map((cell, index) => assignObjectIndex(offset + index, cell));

    for (let index = 0; index < dataOf.length; index++) {
      const element = dataOf[index];
      Image.getSize(
        element.uri,
        (width, height) => {
          if (onCheckNumber(width) && onCheckNumber(height)) {
            const dataConcat = _insertIntoColumn(
              {
                ...element,
                dimensions: {
                  width,
                  height
                }
              },
              newData
            );
            newData = dataConcat;
            setDataSource(newData);
          }
        },
        _ => {
          console.warn('Image failed to load');
        }
      );
    }
  };

  /**
   * Insert or concat image to array image of column
   * @returns Array
   */
  const _insertIntoColumn = (img: ItemColumn, dataSet: Array<ItemColumn[]>) => {
    const dataCopy = dataSet.slice();
    const columnIndex = img.column;

    const column = dataSet[columnIndex];

    if (column) {
      // Append to existing "row"/"column"
      if (!column.find((x: ItemColumn) => x.uri === img.uri)) {
        const newImages = column.concat(img);
        dataCopy[columnIndex] = newImages;
      }
    } else {
      // Pass it as a new "row" for the data source
      dataCopy[columnIndex] = [img];
    }

    return dataCopy;
  };

  const _onLayoutChange = useCallback(
    ({
      nativeEvent: {
        layout: { height, width }
      }
    }: LayoutChangeEvent) => {
      setDimensions({ height, width });
    },
    []
  );

  const _onHandleEndReach = useCallback(() => {
    if (typeof onEndReach === 'function') {
      onEndReach();
    }
  }, [onEndReach]);
  const _onRefresh = useCallback(() => {
    if (typeof onRefresh === 'function') {
      onRefresh();
    }
  }, [onRefresh]);
  const _renderItem = ({ item }: { item: ItemColumn[]; index: number }) => (
    <Column
      {...{
        onPress,
        space: space < 0 ? 0 : space,
        containerImageStyle,
        customRenderItem,
        renderFooter,
        renderHeader,
        dimensions,
        columns: oldColumn
      }}
      data={item}
    />
  );
  const _keyExtractor = useCallback((_: ItemColumn[], index) => index.toString(), [dataSource]);

  // effect
  useEffect(() => {
    if (Array.isArray(data)) {
      const _actualColumn = columns > data.length ? data.length : columns;
      const driffData = containMatchingUri(oldData, data);
      const _uniqueCount = driffData.length + data.length;
      _formatData(
        driffData.length === 0 ? oldData : driffData,
        _actualColumn,
        oldColumn !== _actualColumn,
        _uniqueCount
      );
      setOldColumn(_actualColumn);
      setOldData(data);
    }
  }, [data, columns, space]);
  return (
    <View onLayout={_onLayoutChange} style={[styles.container]}>
      <FlatList
        refreshControl={
          canRefresh ? (
            <RefreshControl colors={refreshColor} onRefresh={_onRefresh} refreshing={refreshing} />
          ) : undefined
        }
        data={dataSource}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.content]}
        removeClippedSubviews={true}
        onEndReached={_onHandleEndReach}
        onEndReachedThreshold={16}
      />
    </View>
  );
};

export const Masonry = memo(MasonryComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  }
});
