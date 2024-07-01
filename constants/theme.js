import { Platform } from "react-native";

const COLORS = {
  primary: '#01224a',
  secondary: '#CDCDD2',

  accent: '#296335',

  textPrimary: '#000000',
  textSecondary: '#FFFFFF',

  buttonPrimary: '#5A5A5A',
  buttonSecondary: '#FFFFFF',

  backgroundPrimary: '#000000',
  backgroundSecondary: '#FFFFFF',

  borderPrimary: '#FFFFFF',
  borderSecondary: '#CDCDD2',

  error: '#FF0000',
  success: '#00FF00',
  warning: '#FFC700',
  info: '#00FFFF',

  black: '#000000',
  white: '#FFFFFF',
  nearBlack: '#0D0D0D',
  darkGray: '#111111',
  gray: '#222222',
  lightGray: '#666666',
  nearWhite: '#F4F4F4',

  aiAccent: '#653eb5',
  aiBackground: '#160538',
  aiLightText: '#ad8bf0',
  
  messageBackground: '#103e94',

  typeBubbleBackground: '#653eb5',
  tagBubbleBackground: '#103e94',
};

const FONT = {
  family: Platform.select({
    ios: 'Times New Roman',
    android: 'normal',
  }),
  SIZE: {
    small: 10,
    medium: 15,
    large: 20,
    xlarge: 25,
    xxlarge: 30
  }
};

const SPACING = {
  small: 10,
  medium: 15,
  large: 20,
  xlarge: 25,
  xxlarge: 30
};

const StackScreenBaseOptions = {
  headerStyle: {
    backgroundColor: COLORS.backgroundPrimary,
    color: COLORS.textPrimariy
  },
  headerShadowVisible: false,
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    color: COLORS.white,
    fontFamily: FONT.family
  },
  animation: 'fade'
};

export { COLORS, FONT, SPACING, StackScreenBaseOptions };
