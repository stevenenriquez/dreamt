import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 15,
        color: COLORS.white,
        fontFamily: FONT.family,
        marginBottom: 10
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
        opacity: .7,
        fontFamily: FONT.family,
        marginBottom: 10,
        marginLeft: 20
    },
    text: {
        color: COLORS.white,
        fontFamily: FONT.family,
    },
    content: {
        fontSize: 15,
        color: COLORS.white,
        fontFamily: FONT.family,
        padding: 20,
        borderRadius: 30,
        height: 400,
        backgroundColor: COLORS.black,
        borderWidth: 2,
        borderColor: COLORS.gray
    },
    notes: {
        fontSize: 15,
        color: COLORS.white,
        fontFamily: FONT.family,
        padding: 20,
        borderRadius: 30,
        height: 200,
        backgroundColor: COLORS.black,
        marginBottom: 20,
        paddingBottom: 50,
        borderWidth: 2,
        borderColor: COLORS.gray
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
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginRight: 10
    },
    noImagesContainer: {
        height: 200,
        width: 200,
        borderRadius: 10,
        borderStyle: 'dashed',
        backgroundColor: COLORS.black,
        borderColor: COLORS.gray,
        borderWidth: 2,
    },
    noVideoContainer: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        borderStyle: 'dashed',
        backgroundColor: COLORS.black,
        borderColor: COLORS.gray,
        borderWidth: 2,
    },
    tagList: {
        marginTop: 5,
        marginBottom: 5
    },
    deleteImageButton: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 30,
        borderRadius: 10,
        backgroundColor: COLORS.black,
        borderColor: COLORS.white,
        borderWidth: 1,
        zIndex: 1
    },
    deleteImageButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    clarityImage: {
        width: '100%',
        height: 150,
        borderRadius: 20,
    }
});

export default styles;