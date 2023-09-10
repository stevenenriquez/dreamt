import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function Home() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: 'My Dreams'
                }}
            />
            <View>
                <Text>Home</Text>
                <Link href="/add">Add</Link>
            </View>
        </>
    );
}