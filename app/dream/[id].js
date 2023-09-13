import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text } from 'react-native';
import { getDream } from '../../utils/db';
import styles from '../../styles/Dream.styles';
import { useEffect, useState } from "react";

export default function Dream() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState([]);

    const getDreamEntry = async () => {
        const dream = await getDream(id);
        if(dream && dream.rows && dream.rows._array && dream.rows._array.length > 0) {
            setData(dream.rows._array[0]);
        }
    }

    useEffect(() => {
        getDreamEntry();
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: ''
                }}
            />
            <View style={styles.container}>
            <Text style={styles.title}>{data.title || 'Dream Not Found'}</Text>
            <Text style={styles.date}>12/12/12</Text>
            <Text style={styles.text}>{data.content || ''}</Text>
            </View>
        </>
    )
}