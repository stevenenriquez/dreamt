import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 20,
    },
    text: {
        color: COLORS.white,
        fontFamily: 'monospace',
    },
    refresh: {
        marginLeft: 16,
        opacity: 0.6
    }
});

export default styles;