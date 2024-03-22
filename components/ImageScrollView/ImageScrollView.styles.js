import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const windowWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  images: {
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 20
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black
  },
  fullImage: {
    width: windowWidth - 15,
    height: undefined,
    aspectRatio: 1
  }
});
