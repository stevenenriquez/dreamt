import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import styles from '../styles/Home.styles';

export default function Home() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: 'My Dreams'
                }}
            />
            <View style={styles.container}>
                <Link href="/add" style={styles.addButton}>+</Link>
            </View>
        </>
    );
}