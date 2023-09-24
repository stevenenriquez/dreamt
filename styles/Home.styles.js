import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    addButton: {
        color: COLORS.black,
        fontSize: 30,
        position: 'absolute',
        bottom: 50,
        right: 20,
        padding: 10,
        width: 50,
        textAlign: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 30
    },
    text: {
        color: COLORS.white,
        fontSize: 20
    }
});

export default styles;