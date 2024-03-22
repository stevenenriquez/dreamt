import { View, TextInput, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import { useState } from 'react';
import BounceToggle from '../BounceToggle/BounceToggle';
import BounceButton from '../BounceButton/BounceButton';

const categories = [
  'Lucid',
  'Recurring',
  'Nightmare',
  'False Awakening',
  'Sleep Paralysis'
];

export default function DreamCategories(props) {
  const [tagSearchText, setTagSearchText] = useState('');

  const handleTagSearchTextChange = (text) => {
    setTagSearchText(text);
    if (text.endsWith(' ')) {
      if (
        text.trim().length > 0 &&
        !props.tags.includes(text.trim()) &&
        !text.trim().includes(' ')
      ) {
        props.setTags((prevTags) => {
          let newTags = [...prevTags];
          newTags.push(text.trim());
          return newTags;
        });
      }
      setTagSearchText('');
    }
  };

  const selectedTags = categories.filter((filter) =>
    props.tags.includes(filter)
  );

  const commonTags = [
    categories.map((category, index) => {
      return (
        <View
          style={{ marginHorizontal: 5, marginBottom: 10 }}
          key={`view-${index}`}
        >
          <BounceToggle
            onPressToggled={() =>
              props.setTags(props.tags.filter((t) => t !== category))
            }
            onPressUntoggled={() => props.setTags([...props.tags, category])}
            key={`category-${index}`}
            text={category}
            toggled={selectedTags.includes(category)}
            toggledBackgroundColor={COLORS.accent}
          />
        </View>
      );
    })
  ];

  const tagList =
    props.tags &&
    props.tags.length > 0 &&
    props.tags.map((tag, index) => {
      if (!categories.includes(tag)) {
        return (
          <View
            style={{ marginHorizontal: 5, marginBottom: 10 }}
            key={`tag-${index}`}
          >
            <BounceButton
              onPress={() => props.setTags(props.tags.filter((t) => t !== tag))}
              text={tag}
            />
          </View>
        );
      }
    });

  return (
    <View>
      <ScrollView horizontal={true}>{commonTags}</ScrollView>
      <Text style={styles.tagTitle}>Tags</Text>
      <View style={styles.tagList}>{tagList}</View>
      <TextInput
        style={styles.tagSearchText}
        placeholder="type tags separated by a space"
        placeholderTextColor={COLORS.lightGray}
        value={tagSearchText}
        onChangeText={handleTagSearchTextChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 10,
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
  tagSearchText: {
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 5,
    borderBottomColor: COLORS.darkGray,
    borderBottomWidth: 2
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
