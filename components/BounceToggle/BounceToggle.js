import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import BounceProvider from '../BounceProvider/BounceProvider';

const BounceToggle = ({
  onPressToggled,
  onPressUntoggled,
  text,
  toggled,
  toggledBackgroundColor
}) => {
  return (
    <BounceProvider onPress={toggled ? onPressToggled : onPressUntoggled}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: toggled
              ? toggledBackgroundColor || COLORS.accent
              : COLORS.darkGray
          }
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </BounceProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT.fontSize,
    paddingVertical: 7,
    paddingHorizontal: 15,
    fontFamily: FONT.family,
    textAlign: 'center'
  }
});

export default BounceToggle;
