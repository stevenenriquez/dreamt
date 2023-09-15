import { Stack } from 'expo-router';
import { COLORS, FONT } from '../constants/theme';
import { APP_NAME } from '../constants/constants';
import { en, registerTranslation } from 'react-native-paper-dates';

registerTranslation('en', en);

export default function Layout() {
    return (
        <>
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.backgroundPrimary,
                        color: COLORS.textPrimariy
                    },
                    headerShadowVisible: false,
                    headerTitle: APP_NAME,
                    headerTintColor: COLORS.white,
                    headerTitleStyle: {
                        color: COLORS.white,
                        fontFamily: FONT.family
                    },
                    animation: 'fade',
                }}
            />
        </>
    );

}