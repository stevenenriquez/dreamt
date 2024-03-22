import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.family
  },
  refresh: {
    marginLeft: 16,
    opacity: 0.6
  }
});

export default styles;
