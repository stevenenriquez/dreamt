import { SafeAreaView } from 'react-native';
import { Link, Stack } from 'expo-router';
import DreamList from '../components/DreamList/DreamList';
import styles from '../styles/Home.styles';

export default function Home() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: ''
                }}
            />
            <SafeAreaView style={styles.container}>
                <DreamList />
                <Link href="/add" style={styles.addButton}>+</Link>
            </SafeAreaView>
        </>
    );
}