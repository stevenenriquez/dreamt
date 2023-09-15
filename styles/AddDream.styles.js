import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: COLORS.white,
        fontFamily: FONT.family,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    date: {
        color: COLORS.white,
        fontFamily: FONT.family,
        marginBottom: 10,
        marginLeft: 20
    },
    text: {
        color: COLORS.white,
        fontFamily: FONT.family,
    },
    textInputPlaceholder: {
        opacity: .7
    },
    content: {
        fontSize: 15,
        color: COLORS.white,
        fontFamily: FONT.family,
        padding: 10,
        paddingTop: 20,
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 10,
        height: 400
    },
    button: {
        marginRight: 5
    },
    headerButton: {
        marginRight: 10
    },
    disabledButton: {
        opacity: .3
    },
    buttonText: {
        fontFamily: FONT.family,
        fontSize: 15,
        color: COLORS.white
    }
});

export default styles;