import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginTop: 'auto',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
        fontFamily: FONT.family,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        width: 75,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 'auto'
    },
});