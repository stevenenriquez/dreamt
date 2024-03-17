import { FlatList, RefreshControl, View } from 'react-native';
import styles from '../DreamList/DreamList.styles';
import DreamPreview from '../DreamPreview/DreamPreview';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { deleteDream } from '../../utils/db';
import { getDreamsPaginated } from '../../utils/db';

export default function DreamList(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useFocusEffect(
        useCallback(() => {
          resetList();
        }, [resetList])
    );

    const clearList = () => {
      setData([]);
      setPage(1);
    }

    const resetList = () => {
      clearList();
      getPaginated();
    }

    useEffect(() => {
      if(props.searchText) {
        const myTimeout = setTimeout(() => {
          clearList();
          getPaginated(props.searchText);
        }, 1000);
        return () => {
          clearTimeout(myTimeout);
        }
      } else {
        clearList();
        getPaginated();
      }
    }, [props.searchText]);

    const getPaginated = async (searchText) => {
      let dreams = [];

      if(searchText && searchText.length > 2) {
        dreams = await getDreamsPaginated(page, 5, searchText);
      } else {
        dreams = await getDreamsPaginated(page, 5, null);
      }
      if(dreams && dreams.rows && dreams.rows._array && dreams.rows._array.length > 0) {
        if(page > 1) {
          setData((prevDreams) => [...prevDreams, ...dreams.rows._array]);
        } else {
          setData(dreams.rows._array);
        }
      }
      setIsLoading(false);
    }

    const loadMoreDreams = useCallback(async () => {
      setPage((prevPage) => prevPage + 1);
      if(props.searchText) {
        getPaginated(props.searchText);
      } else {
        getPaginated();
      }
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
                    ListFooterComponent={<View style={{ height: 100 }} />}
                />
            </RefreshControl>
        </>
    )
}