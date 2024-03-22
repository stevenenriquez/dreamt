import { Stack } from 'expo-router';
import { en, registerTranslation } from 'react-native-paper-dates';

registerTranslation('en', en);

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}