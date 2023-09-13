import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: COLORS.white,
        fontFamily: 'monospace',
        width: '80%',
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
    button: {
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
        width: 33,
        padding: 10,
        marginTop: 5,
    },
    link: {
        flex: 1,
        color: COLORS.white,
        fontFamily: 'monospace',
    }
});

export default styles;