import { Stack } from 'expo-router';
import { COLORS, FONT } from '../constants/theme';
import { APP_NAME } from '../constants/constants';

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
                        fontFamily: FONT.fontFamily
                    },
                }}
            />
        </>
    );

}