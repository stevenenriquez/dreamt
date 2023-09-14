import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
    toggleContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    selectedButtonText: {
        color: COLORS.black,
        textAlign: 'center',
    },
    unselectedButton: {
        backgroundColor: COLORS.black,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    unselectedButtonText: {
        color: COLORS.white,
        textAlign: 'center',
    }
});