import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    addButton: {
        color: COLORS.white,
        fontSize: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 10,
        width: 50,
        textAlign: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 30
    }
});

export default styles;