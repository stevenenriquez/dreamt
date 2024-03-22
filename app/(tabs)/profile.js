import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants/theme';

export default function Tab() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'fade'
        }}
      />
      <View
        style={{
          backgroundColor: COLORS.black,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        <Text style={{ color: COLORS.textSecondary }}>Profile</Text>
      </View>
    </>
  );
}
