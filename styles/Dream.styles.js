import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: COLORS.white,
        fontFamily: 'monospace'
    },
    date: {
        opacity: 0.8,
        color: COLORS.white,
        fontFamily: 'monospace',
        paddingTop: 10
    },
    text: {
        marginTop: 10,
        color: COLORS.white,
        fontFamily: 'monospace',
    },
});

export default styles;