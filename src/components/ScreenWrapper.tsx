import React, { FC, memo, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  SafeAreaView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { isIos } from '../helpers/common';

const keyboardAvoidingDefaults: KeyboardAvoidingViewProps = {
  behavior: isIos ? 'padding' : undefined,
  keyboardVerticalOffset: 0,
  style: { flex: 1 },
};

const styles = StyleSheet.create({
  background: {},
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
});

export interface ScreenWrapperProps {
  style?: StyleProp<ViewStyle>;
  screenStyle?: StyleProp<ViewStyle>;
  needInSafeArea?: boolean;

  scroll?: boolean;
  scrollViewProps?: ScrollViewProps;

  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  hideWebHeader?: boolean;
  hideWebFooter?: boolean;
  fixedComponentTop?: React.ReactNode;
}

export interface ScreenWrapperState {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export const ScreenWrapper: FC = memo(
  ({
    children,
    needInSafeArea,
    scrollViewProps,
    style,
    scroll,
    screenStyle,
    fixedComponentTop,
    keyboardAvoidingViewProps,
  }: ScreenWrapperProps) => {
    const [safeAreaInsets] = useState<ScreenWrapperState>({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    });
    const defaultScroll = false;
    const scrollCurrent: boolean = scroll ? scroll : defaultScroll;

    const getKeyboardAvoidingOptions = (): KeyboardAvoidingViewProps => {
      const options = {
        ...keyboardAvoidingDefaults,
        ...keyboardAvoidingViewProps,
      };

      if (
        needInSafeArea &&
        options.keyboardVerticalOffset &&
        options.keyboardVerticalOffset > 0
      ) {
        options.keyboardVerticalOffset += safeAreaInsets.bottom;
      }

      return options;
    };

    const keyboardAvoidingOptions = getKeyboardAvoidingOptions();
    const Container = needInSafeArea ? SafeAreaView : View;
    const contents = scrollCurrent ? (
      <Animated.ScrollView
        {...scrollViewProps}
        keyboardShouldPersistTaps={'always'}>
        {children}
      </Animated.ScrollView>
    ) : (
      children
    );

    return (
      <View style={screenStyle}>
        <Container style={[styles.container, style]}>
          {fixedComponentTop}
          <KeyboardAvoidingView {...keyboardAvoidingOptions}>
            {contents}
          </KeyboardAvoidingView>
        </Container>
      </View>
    );
  },
);
