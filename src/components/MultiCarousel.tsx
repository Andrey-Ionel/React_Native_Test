import React, {
  LegacyRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewabilityConfig,
  ViewStyle,
  ViewToken,
} from 'react-native';

import { PageIndicator } from './PageIndicator';

interface SlideChangeEvent {
  currentIndex: number;
  nextIndex: number;
}

export interface ViewableItemsInfo {
  viewableItems: ViewToken[];
  changed: ViewToken[];
  showSFCText?: boolean;
}

interface MultiCarouselProps {
  brandStyle?: any;
  buttonProps?: any;
  centerMode?: boolean;
  dotActiveStyle?: any;
  dotStyle?: any;
  items: any[];
  itemsPerPage?: number;
  itemStyle?: any;
  onSlideChange?: (data: SlideChangeEvent) => void;
  nextArrowContainerStyle?: any;
  nextArrowStyle?: any;
  nextArrowOnBlur?: () => void;
  pageIndicatorStyle?: any;
  peekSize?: number;
  prevArrowContainerStyle?: any;
  prevArrowStyle?: any;
  prevArrowOnBlur?: () => void;
  renderItem: (data: any, i: number) => ReactNode;
  renderPageIndicator?: (currentIndex: number, itemsCount: number) => ReactNode;
  hidePageIndicator?: boolean;
  showArrow?: boolean;
  style?: any;
  zoomButtonStyle?: any;
  keyExtractor?: (item: any, index: number) => string;
  hideZoomButton?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  viewabilityConfig?: ViewabilityConfig;
  onViewableItemsChanged?: (info: ViewableItemsInfo) => void;
}

const S = StyleSheet.create({
  goToNext: {
    position: 'absolute',
    top: '50%',
    right: 0,
    zIndex: 100,
    marginTop: -15,
    padding: 10,
  },
  goToPrev: {
    position: 'absolute',
    top: '50%',
    left: 0,
    zIndex: 100,
    marginTop: -15,
    padding: 10,
  },
  buttonPrevIcon: {
    width: 25,
    height: 25,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'black',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  buttonNextIcon: {
    width: 25,
    height: 25,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'black',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  alignCenter: {
    alignItems: 'center',
  },
});

const MultiCarousel = (props: MultiCarouselProps) => {
  const scrollView = useRef<FlatList>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const opacity = useState<Animated.Value>(new Animated.Value(1))[0];

  const initialScrollX = useRef<number>(0);
  const defaultPeekSize = 0;
  const defaultItemsPerPage = 2;

  useEffect(() => {
    if (props?.itemsPerPage) {
      setItemWidth(getItemWidth(containerWidth));
    }
    if (props?.items?.length <= currentIndex) {
      if (props?.items?.length) {
        setCurrentIndex(props.items.length - 1);
      } else if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
    }
  }, [props?.itemsPerPage, props.items.length, currentIndex, containerWidth]);

  const handleContainerSizeChange = (e: any) => {
    const containerWidthEvent = e.nativeEvent.layout.width;

    if (containerWidthEvent === containerWidth) {
      return;
    }

    setContainerWidth(containerWidthEvent);
    setItemWidth(getItemWidth(containerWidthEvent));
  };

  const goToNext = (options?: any) => {
    options = options || { animated: true };
    const nextIndex =
      currentIndex + 1 > getPageNum() - 1 ? getPageNum() - 1 : currentIndex + 1;

    goTo(nextIndex, options);
  };

  const goToPrev = (options?: any) => {
    options = options || { animated: true };

    const nextIndex = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
    goTo(nextIndex, options);
  };

  const goTo = (index: number, options?: any) => {
    options = options || { animated: true };

    if (!scrollView.current) {
      return;
    }

    scrollView?.current?.scrollToOffset({
      offset: index * getPageWidth(),
      animated: options.animated,
    });

    if (props.onSlideChange && currentIndex !== index) {
      props.onSlideChange({
        currentIndex: currentIndex,
        nextIndex: index,
      });
    }

    setCurrentIndex(index);
  };

  const goToOrigin = () => {
    goTo(currentIndex);
  };

  const handleScrollRelease = (e: any) => {
    if (Platform.OS !== 'android') {
      return;
    }

    const diffX = e.nativeEvent.contentOffset.x - initialScrollX.current;

    if (diffX > 80 || e.nativeEvent.velocity.x < -0.5) {
      goToNext();
    } else if (diffX < -80 || e.nativeEvent.velocity.x > 0.5) {
      goToPrev();
    } else {
      goToOrigin();
    }
  };

  const handleScrollBegin = (e: any) => {
    if (Platform.OS !== 'android') {
      return;
    }
    initialScrollX.current = e.nativeEvent.contentOffset.x;
  };

  const handleMomentumScrollEnd = (e: any) => {
    if (Platform.OS !== 'ios') {
      return;
    }
    const offset =
      e.nativeEvent.contentOffset.x < 0 ? 0 : e.nativeEvent.contentOffset.x;

    const pageWidth = getPageWidth();
    const pageNum = getPageNum();

    const nextIndex =
      offset > pageWidth * (pageNum - 2)
        ? pageNum - 1
        : Math.floor(offset / pageWidth);
    setCurrentIndex(nextIndex);

    if (props.onSlideChange) {
      props.onSlideChange({
        currentIndex: currentIndex,
        nextIndex: nextIndex,
      });
    }
  };

  const getPageNum = () => {
    return Math.ceil(
      props?.items?.length /
        Math.floor(props?.itemsPerPage || defaultItemsPerPage),
    );
  };

  const getPageWidth = () => {
    return itemWidth * Math.floor(props.itemsPerPage || defaultItemsPerPage);
  };

  const getItemWidth = (itemContainerWidth: number) => {
    const peekSize = props.peekSize || defaultPeekSize;
    const itemPerPage = props.itemsPerPage || defaultItemsPerPage;

    return (
      (itemContainerWidth - peekSize * (props.centerMode ? 2 : 1)) / itemPerPage
    );
  };

  const renderSingle = () => {
    if (!props.items || !props.items.length) {
      return null;
    }

    return (
      <View
        style={[S.alignCenter, props.style]}
        onLayout={handleContainerSizeChange}>
        <View style={[{ width: itemWidth }, props.itemStyle]}>
          {props.renderItem(props.items[0], 0)}
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <View key={index} style={[{ width: itemWidth }, props.itemStyle]}>
        {props?.renderItem(item, index)}
      </View>
    );
  };

  const keyExtractor = (item: any, index: number): string => {
    if (props.keyExtractor) {
      return props.keyExtractor(item, index);
    }

    const testItem = item as any;

    return testItem.key || testItem.id || '' + index;
  };

  const snapToInterval =
    itemWidth * Math.floor(props.itemsPerPage || defaultItemsPerPage);

  const pageNum = getPageNum();

  if (props?.items?.length <= 1) {
    return renderSingle();
  }

  return (
    <Animated.View
      style={[props.style, { opacity: opacity, overflow: 'hidden' }]}>
      <FlatList
        onLayout={handleContainerSizeChange}
        horizontal={true}
        ref={scrollView as LegacyRef<FlatList<any>> | undefined}
        decelerationRate={0}
        snapToAlignment={'start'}
        snapToInterval={snapToInterval}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollEndDrag={handleScrollRelease}
        onScrollBeginDrag={handleScrollBegin}
        data={props?.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={props.contentContainerStyle}
        viewabilityConfig={props.viewabilityConfig}
        onViewableItemsChanged={props.onViewableItemsChanged}
        bounces={false}
      />

      {props.renderPageIndicator ? (
        props.renderPageIndicator(currentIndex, props.items.length)
      ) : (
        <PageIndicator
          style={props.pageIndicatorStyle}
          currentIndex={currentIndex}
          itemsCount={pageNum}
          dotStyle={props.dotStyle}
          dotActiveStyle={props.dotActiveStyle}
        />
      )}

      {currentIndex !== 0 && !!props.showArrow && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={'Show previous'}
          style={[S.goToPrev, props.prevArrowContainerStyle]}
          onPress={goToPrev}>
          <View style={[S.buttonPrevIcon, props.prevArrowStyle]} />
        </TouchableOpacity>
      )}

      {currentIndex !== pageNum - 1 && !!props.showArrow && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={'Show next'}
          style={[S.goToNext, props.nextArrowContainerStyle]}
          onPress={goToNext}>
          <View style={[S.buttonNextIcon, props.nextArrowStyle]} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default MultiCarousel;
