import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listFooter: {
    height: 50,
  },
  weatherIcon: {
    height: 50,
    width: 50,
  },
  listIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  listHeader: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemSeparator: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
