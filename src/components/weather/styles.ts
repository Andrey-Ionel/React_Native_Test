import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../varibles/fonts';
import palette from '../../varibles/colors';

export const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    paddingBottom: 40,
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
    fontSize: 22,
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
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIcon: {
    height: 210,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 20,
  },
  temperatureText: {
    fontFamily: fonts.gotham,
    fontWeight: '300',
    fontSize: 110,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
    marginTop: 20,
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 20,
  },
  detailDailyContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  detailIcon: {
    height: 50,
    width: 100,
  },
  detailText: {
    fontFamily: fonts.gotham,
    fontWeight: '300',
    fontSize: 20,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
    marginTop: 20,
  },
  detailDarkText: {
    color: palette.textSecondary,
    fontWeight: '500',
  },
  wrapper: {
    flex: 1,
  },
  detailTimeText: {
    fontFamily: fonts.gotham,
    fontWeight: '300',
    fontSize: 15,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  todayDetail: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  loadingContainer: {
    height: screenHeight - 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcherContainer: {
    position: 'absolute',
    bottom: -20,
    right: 20,
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: palette.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switcherText: {
    fontFamily: fonts.gotham,
    fontWeight: '400',
    fontSize: 26,
    letterSpacing: 1,
    color: palette.textSecondary,
  },
});
