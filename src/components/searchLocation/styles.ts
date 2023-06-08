import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../varibles/fonts';
import colors from '../../varibles/colors';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
  },
  listData: {
    backgroundColor: 'transparent',
    flex: 1,
    borderRadius: 10,
    padding: 15,
  },
  emptyList: {
    transform: [{ scale: 0 }],
  },
  item: {
    fontFamily: fonts.gotham,
    fontSize: 22,
    letterSpacing: 0.3,
    paddingVertical: 5,
    marginLeft: 40,
  },
  noResult: {
    fontFamily: fonts.gotham,
    fontSize: 18,
    letterSpacing: 1,
    paddingVertical: 5,
    marginLeft: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.separatorPrimary,
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    height: 50,
    padding: 15,
    borderColor: colors.separatorPrimary,
    marginLeft: 20,
    fontFamily: fonts.gotham,
    fontSize: 18,
  },
  searchIcon: {
    position: 'absolute',
    top: -10,
    right: 10,
  },
  backArrow: {
    width: 22,
    height: 18,
  },
});
