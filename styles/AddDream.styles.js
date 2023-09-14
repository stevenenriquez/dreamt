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
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        width: 75,
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 'auto'
    },
    disabledButton: {
        opacity: .4
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONT.family,
        fontSize: 15,
        color: COLORS.black
    }
});

export default styles;