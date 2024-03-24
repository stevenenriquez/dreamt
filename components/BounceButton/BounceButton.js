import { View, Text } from 'react-native';
import BounceProvider from '../BounceProvider/BounceProvider';
import { COLORS, FONT } from '../../constants/theme';

const BounceButton = ({ onPress, text, color }) => {
  return (
    <BounceProvider onPress={onPress}>
      <View style={[styles.button, color ? { backgroundColor: color } : null]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </BounceProvider>
  );
};

export default BounceButton;

const styles = {
  button: {
    borderRadius: 20,
    backgroundColor: COLORS.accent
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT.fontSize,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: FONT.family,
    textAlign: 'center'
  }
};
