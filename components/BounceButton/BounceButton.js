import { View, Text } from 'react-native';
import BounceProvider from '../BounceProvider/BounceProvider';
import { COLORS, FONT } from '../../constants/theme';

const BounceButton = ({ onPress, text, color, textColor }) => {
  return (
    <BounceProvider onPress={onPress}>
      <View style={[styles.button, color ? { backgroundColor: color } : null]}>
        <Text style={[styles.buttonText, textColor ? { color: textColor } : null]}>{text}</Text>
      </View>
    </BounceProvider>
  );
};

export default BounceButton;

const styles = {
  button: {
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    elevation: 3
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT.SIZE.medium,
    paddingVertical: 7,
    paddingHorizontal: 15,
    fontFamily: FONT.family,
    textAlign: 'center',
    fontWeight: 'bold'
  }
};
