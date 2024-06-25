import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import styles from '../../styles/Home.styles';
import DreamList from '../../components/DreamList/DreamList';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DreamSearch from '../../components/DreamSearch/DreamSearch';
import { useState } from 'react';

export default function Tab() {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'fade'
        }}
      />
      <SafeAreaView style={styles.container}>
        <DreamSearch searchText={searchText} onSearchTextChange={setSearchText} />
        <DreamList searchText={searchText} />
        <Link href="/add" style={styles.addButton}>
          <FontAwesome size={28} name="plus" color={COLORS.textPrimary} />
        </Link>
      </SafeAreaView>
    </>
  );
}