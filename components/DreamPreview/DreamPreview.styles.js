import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.darkGray,
        borderRadius: 10,
        padding: 20,
        margin: 6
    },
    selectedContainer: {
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        padding: 20,
        margin: 6
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
        fontFamily: FONT.family,
        fontWeight: 'bold',
    },
    date: {
        opacity: 0.5,
        color: COLORS.white,
        fontFamily: FONT.family,
        marginBottom: 20
    },
    text: {
        color: COLORS.white,
        fontFamily: FONT.family,
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
        fontFamily: FONT.family,
    },
    modal: {
        backgroundColor: COLORS.black,
        padding: 20,
        borderRadius: 10,
        margin: 10,
        marginTop: 'auto',
        marginBottom: 0,
    },
    modalOption: {
        padding: 10,
        borderRadius: 10,
        margin: 5,
        color: COLORS.white,
        fontFamily: FONT.family,
        textAlign: 'center'
    }
});

export default styles;