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
        fontFamily: 'monospace',
        backgroundColor: '#111',
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    content: {
        fontSize: 15,
        color: COLORS.white,
        fontFamily: 'monospace',
        backgroundColor: '#111',
        padding: 10,
        paddingTop: 20,
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        width: 100,
        alignSelf: 'center',
        marginTop: 20
    },
    disabledButton: {
        opacity: .4
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: 15,
        color: COLORS.black
    }
});

export default styles;