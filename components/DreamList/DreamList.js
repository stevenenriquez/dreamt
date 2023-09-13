import { FlatList, TouchableOpacity, Text } from 'react-native';
import styles from './DreamList.styles';
import DreamPreview from '../DreamPreview/DreamPreview';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getAllDreams, deleteDream } from '../../utils/db';

export default function DreamList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getDreams();
        }, [])
    );

    const getDreams = async () => {
        setIsLoading(true);
        const dreams = await getAllDreams();
        if(dreams && dreams.rows && dreams.rows._array && dreams.rows._array.length > 0) {
            setData(dreams.rows._array);
        }
        setIsLoading(false);
    };

    const deleteDreamEntry = async (id) => {
        await deleteDream(id);
        getDreams();
    };

    return (
        <>
            <TouchableOpacity style={styles.refresh} onPress={getDreams}>
                <Text style={styles.text}>{isLoading ? '...' : 'Refresh'} </Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                extraData={data}
                renderItem={({ item }) => (<DreamPreview id={item.id} title={item.title} content={item.content} deleteDream={() => deleteDreamEntry(item.id)} />)}
                keyExtractor={item => item.id}
                style={styles.container}
            />
        </>
    )
}