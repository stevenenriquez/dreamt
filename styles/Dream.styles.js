import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20,
    },
    title: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: FONT.family,
    },
    content: {
        color: COLORS.white,
        fontFamily: FONT.family,
        marginTop: 20,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: COLORS.nearBlack,
        borderWidth: 1,
        borderColor: COLORS.gray,
        padding: 10
    },
    editingContent: {
        color: COLORS.white,
        fontFamily: FONT.family,
        marginTop: 30,
        maxHeight: '50%',
        borderRadius: 10,
    },
    editingField: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        borderStyle: 'dashed',
        padding: 15,
    },
    editingTitle: {
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        paddingBottom: 10,
    },
    date: {
        opacity: 0.8,
        color: COLORS.white,
        fontFamily: FONT.family,
        marginBottom: 10
    },
    text: {
        color: COLORS.white,
        fontFamily: FONT.family,
    },
    editButton: {
        marginRight: 5,
    },
    deleteButton: {
        marginRight: 25
    },
    disabledButton: {
        opacity: .4
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