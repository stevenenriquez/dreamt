import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: COLORS.borderSecondary,
        borderWidth: 1,
        padding: 10,
        margin: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        color: COLORS.white,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    date: {
        opacity: 0.8,
        color: COLORS.white,
        fontFamily: 'monospace',
        marginBottom: 5
    },
    text: {
        color: COLORS.white,
        fontFamily: 'monospace',
    },
    button: {
        marginRight: 10
    },
    deleteButtonText: {
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
    link: {
        flex: 1,
        color: COLORS.white,
        fontFamily: 'monospace',
    }
});

export default styles;