import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
    toggleContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tag: {
        backgroundColor: COLORS.black,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 20,
        padding: 1,
        margin: 5
    },
    tagText: {
        color: COLORS.white,
        fontSize: 15,
        padding: 10,
        fontFamily: 'monospace'
    }
});