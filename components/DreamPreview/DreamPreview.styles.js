import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
    backgroundColor: COLORS.darkGray,
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        margin: 3,
        marginBottom: 5
    },
    selectedContainer: {
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        padding: 20,
        margin: 6
    },
    imagesContainer: {
        marginTop: 10
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
        color: COLORS.lightGray,
        fontFamily: FONT.family,
        marginBottom: 10,
        marginLeft: 'auto',
        fontSize: 12
    },
    text: {
        color: COLORS.lightGray,
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
    },
    images: {
        marginTop: 10
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 10,
        marginRight: 10
    }
});

export default styles;