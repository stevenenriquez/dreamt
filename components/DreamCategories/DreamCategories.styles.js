import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';

export default styles = StyleSheet.create({
    tagList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tag: {
        backgroundColor: COLORS.gray,
        borderRadius: 20,
        padding: 1,
        margin: 5
    },
    tagTitle: {
        color: COLORS.white,
        fontSize: 15,
        padding: 5,
        opacity: 0.8,
        fontFamily: FONT.family
    },
    tagText: {
        color: COLORS.white,
        fontSize: 15,
        padding: 10,
        fontFamily: FONT.family
    },
    tagSearchText: {
        color: COLORS.white,
        fontFamily: FONT.family,
        padding: 5
    },
    category: {
        backgroundColor: COLORS.gray,
        opacity: .6,
        borderRadius: 20,
        padding: 1,
        margin: 5
    }
});