import { FlatList, RefreshControl, View } from 'react-native';
import styles from '../DreamList/DreamList.styles';
import DreamPreview from '../DreamPreview/DreamPreview';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { deleteDream } from '../../utils/db';
import { getDreamsPaginated } from '../../utils/db';
import DreamCategoriesStyles from '../DreamCategories/DreamCategories.styles';

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
  };

  const resetList = async () => {
    await clearList();
    if (props.searchText) {
      getPaginated(props.searchText);
    } else {
      getPaginated();
    }
  };

  useEffect(() => {
    if (props.searchText) {
      const myTimeout = setTimeout(async () => {
        await clearList();
        getPaginated(props.searchText);
      }, 300);
      return () => {
        clearTimeout(myTimeout);
      };
    } else {
      clearList();
      getPaginated();
    }
  }, [props.searchText]);

  const getPaginated = async (searchText) => {
    let dreams = [];

    setIsLoading(true);
    if (searchText && searchText.length > 2) {
      dreams = await getDreamsPaginated(page, 5, searchText);
    } else {
      dreams = await getDreamsPaginated(page, 5, null);
    }

    if (dreams && dreams.length > 0) {
      if (page > 1) {
        setData((prevDreams) => [...prevDreams, ...dreams]);
      } else {
        setData(dreams);
      }
    }
    setIsLoading(false);
  };

  const loadMoreDreams = useCallback(async () => {
    await setPage((prevPage) => prevPage + 1);
    if (props.searchText) {
      await getPaginated(props.searchText);
    } else {
      await getPaginated();
    }
  }, [page, props.searchText]);

  const deleteDreamEntry = async (id) => {
    await deleteDream(id);
    resetList();
  };

  return (
    <>
      <FlatList
        data={data}
        extraData={data}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={resetList} />
        }
        renderItem={({ item }) => (
          <DreamPreview
            id={item.id}
            date={item.date}
            title={item.title}
            content={item.content}
            tags={item.tags}
            deleteDream={() => deleteDreamEntry(item.id)}
            imagePaths={item.imagePaths}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreDreams}
        onEndReachedThreshold={0.1}
        style={styles.container}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </>
  );
}
