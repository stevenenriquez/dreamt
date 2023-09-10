import { Stack } from 'expo-router';
import { COLORS } from '../constants/theme';

export default function Layout() {
    return (
        <>
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.backgroundPrimary,
                        color: COLORS.textPrimary
                    },
                    headerShadowVisible: false,
                    headerTitle: 'Dreamt',
                    headerTintColor: COLORS.white,
                    headerTitleStyle: {
                        color: COLORS.white,
                        fontFamily: 'monospace'
                    },
                }}
            />
        </>
    );

}