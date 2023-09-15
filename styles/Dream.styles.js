import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20,
    },
    title: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: 'monospace'
    },
    content: {
        color: COLORS.white,
        fontFamily: 'monospace',
        marginTop: 30,
        borderRadius: 10,
    },
    editingContent: {
        color: COLORS.white,
        fontFamily: 'monospace',
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
        fontFamily: 'monospace',
        paddingTop: 10
    },
    text: {
        color: COLORS.white,
        fontFamily: 'monospace',
    },
    editButton: {
        marginRight: 5,
    },
    deleteButton: {
        marginRight: 25
    },
    disabledButton: {
        opacity: .4
    }
});

export default styles;