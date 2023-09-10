import { Slot, Stack } from 'expo-router';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
                    headerTitle: 'Homeeeeee',
                    headerTintColor: COLORS.primary,
                    headerTitleStyle: {
                        color: COLORS.white,
                        fontWeight: 'bold',
                    },
                }}
            />
            <Header />
            <Slot />
            <Footer />
        </>
    );

}