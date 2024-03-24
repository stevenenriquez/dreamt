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

export default function DreamCategories({tags, setTags}) {
  const [tagSearchText, setTagSearchText] = useState('');

  const handleTagSearchTextChange = (text) => {
    setTagSearchText(text);
    if (text.endsWith(' ')) {
      if (
        text.trim().length > 0 && !tags.includes(text.trim()) && !text.trim().includes(' ')
      ) {
        setTags('tags', [...tags, text.trim()]);
      }
      setTagSearchText('');
    }
  };

  const selectedTags = categories.filter((filter) => tags.includes(filter));

  const commonTags = [
    categories.map((category, index) => {
      return (
        <View
          style={{ marginHorizontal: 5, marginBottom: 10 }}
          key={`view-${index}`}
        >
          <BounceToggle
            onPressToggled={() =>
              setTags('tags', tags.filter((t) => t !== category))
            }
            onPressUntoggled={() => setTags('tags', [...tags, category])}
            key={`category-${index}`}
            text={category}
            toggled={selectedTags.includes(category)}
            toggledBackgroundColor={COLORS.accent}
          />
        </View>
      );
    })
  ];

  const tagList = () => {
      if(tags && tags.length > 0) {
        return tags.map((tag, index) => {
          if (!categories.includes(tag)) {
            return (
              <View
                style={{ marginHorizontal: 5, marginBottom: 10 }}
                key={`tag-${index}`}
              >
                <BounceButton
                  onPress={() => setTags('tag', tags.filter((t) => t !== tag))}
                  text={tag}
                />
              </View>
            );
          }
        });
      } else {
        return null;
      }
    }

  return (
    <View>
      <ScrollView horizontal={true}>{commonTags}</ScrollView>
      {isEditing && <Text style={styles.tagTitle}>Tags 🏷️</Text>}
      <View style={styles.tagList}>{tagList}</View>
      {isEditing && (
        <TextInput
          style={styles.tagSearchText}
          placeholder="type tags here separated by a space"
          placeholderTextColor={COLORS.lightGray}
          value={tagSearchText}
          onChangeText={handleTagSearchTextChange}
        />
      )}
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
