import { FlatList, RefreshControl } from 'react-native';
import styles from '../DreamList/DreamList.styles';
import DreamPreview from '../DreamPreview/DreamPreview';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { deleteDream } from '../../utils/db';
import { getDreamsPaginated } from '../../utils/db';

export default function DreamList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useFocusEffect(
        useCallback(() => {
          resetList();
        }, [resetList])
    );

    const resetList = () => {
      setData([]);
      setPage(1);
      getPaginated();
    }

    const getPaginated = async () => {
      const dreams = await getDreamsPaginated(page, 5);
      if(dreams && dreams.rows && dreams.rows._array && dreams.rows._array.length > 0) {
        if(data.length > 0) {
          setData((prevDreams) => [...prevDreams, ...dreams.rows._array]);
        } else {
          setData(dreams.rows._array);
        }
      }
      setIsLoading(false);
    }

    const loadMoreDreams = useCallback(() => {
      setPage((prevPage) => prevPage + 1);
    }, []);

    useEffect(() => {
        getPaginated();
    }, [page]);

    const deleteDreamEntry = async (id) => {
        await deleteDream(id);
        resetList();
    };

    return (
        <>
            <RefreshControl refreshing={isLoading} onRefresh={resetList}>
                <FlatList
                    data={data}
                    extraData={data}
                    renderItem={({ item }) => (<DreamPreview id={item.id} date={item.date} title={item.title} content={item.content} deleteDream={() => deleteDreamEntry(item.id)} imagePaths={item.imagePaths} />)}
                    keyExtractor={item => item.id}
                    onEndReached={loadMoreDreams}
                    onEndReachedThreshold={0.1}
                    style={styles.container}
                />
            </RefreshControl>
        </>
    )
}