import { View, TextInput, Pressable, Text, ScrollView } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import { StyleSheet } from 'react-native';

const filters = [
  'Favorites ✨',
  'Lucid 👁',
  'Recurring ♻️',
  'Nightmare 👹',
  'False Awakening 😵‍💫',
  'Sleep Paralysis 😶‍🌫️'
];

export default function DreamFilters(props) {
  const handleSearchTextChange = (text) => {
    props.onSearchTextChange(text);
  };

  const selectedTags = filters.filter((filter) => props.tags.includes(filter));
  const unselectedTags = filters.filter(
    (filter) => !props.tags.includes(filter)
  );

  const commonTags = [
    ...selectedTags.map((filter, index) => (
      <Pressable
        key={`selected-filter-${index}`}
        style={styles.selectedCategory}
        onPress={() =>
          props.onTagsChange(props.tags.filter((t) => t !== filter))
        }
      >
        <Text style={styles.selectedTagText}>{filter}</Text>
      </Pressable>
    )),
    ...unselectedTags.map((filter, index) => (
      <Pressable
        key={`unselected-filter-${index}`}
        style={styles.category}
        onPress={() => props.onTagsChange([...props.tags, filter])}
      >
        <Text style={styles.tagText}>{filter}</Text>
      </Pressable>
    ))
  ];

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
      <ScrollView horizontal={true}>{commonTags}</ScrollView>
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
  tagList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  tag: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 1,
    margin: 5
  },
  tagTitle: {
    color: COLORS.white,
    fontSize: 15,
    padding: 5,
    opacity: 0.8,
    fontFamily: FONT.family
  },
  tagText: {
    color: COLORS.white,
    fontSize: 15,
    padding: 10,
    fontFamily: FONT.family
  },
  selectedTagText: {
    color: COLORS.black,
    fontSize: 15,
    padding: 10,
    fontFamily: FONT.family
  },
  searchText: {
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 5
  },
  category: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
    borderRadius: 20,
    padding: 1,
    margin: 5
  },
  selectedCategory: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderRadius: 20,
    padding: 1,
    margin: 5
  }
});
