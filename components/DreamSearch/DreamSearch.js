import { View, TextInput} from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export default function DreamSearch(props) {
  const handleSearchTextChange = (text) => {
    props.onSearchTextChange(text);
  };

  return (
    <View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchText}
          placeholder="🧠 Search your subconscious..."
          placeholderTextColor={COLORS.lightGray}
          value={props.searchText}
          onChangeText={handleSearchTextChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5
  },
  searchText: {
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 5
  }
});
