import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../varibles/fonts';
import palette from '../../varibles/colors';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  locationIcon: {
    height: 30,
    width: 30,
  },
  searchIcon: {
    height: 25,
    width: 25,
  },
  title: {
    fontFamily: fonts.ghotamBold,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.ghotamBold,
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
  },
});
