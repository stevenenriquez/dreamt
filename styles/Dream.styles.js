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
    content: {
        color: COLORS.white,
        fontFamily: 'monospace',
        marginTop: 50
    },
    date: {
        opacity: 0.8,
        color: COLORS.white,
        fontFamily: 'monospace',
        paddingTop: 10
    },
    text: {
        color: COLORS.white,
        fontFamily: 'monospace',
    },
    editButton: {
        marginRight: 5,
    },
    deleteButton: {
        marginRight: 25
    }
});

export default styles;