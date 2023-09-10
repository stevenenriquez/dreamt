import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import styles from '../../styles/AddDream.styles';

export default function AddPage() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: 'Add a Dream'
                }}
            />
            <View style={styles.container}>
                <Text>Add</Text>
            </View>
        </>
    );
}