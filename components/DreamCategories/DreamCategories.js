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

export default function DreamCategories({tags, setTags, isEditing}) {
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

  const selectedTags = categories.filter((filter) => tags?.includes(filter)) || [];

  const renderCategoryList = items => {
    if(items) {
      const categoryList = items.map((category, index) => {
        return (
          <View
            style={{ marginHorizontal: 5, marginBottom: 10 }}
            key={`view-${index}`}
          >
            <BounceToggle
              onPressToggled={() => {
                if(isEditing) {
                  setTags('tags', tags.filter((t) => t !== category))
                }
              }}
              onPressUntoggled={() => {
                if(isEditing) {
                  setTags('tags', [...tags, category])
                }
              }}
              key={`category-${index}`}
              text={category}
              toggled={selectedTags.includes(category)}
              toggledBackgroundColor={COLORS.accent}
            />
          </View>
        );
      });
      return categoryList;
    }
  }

  const renderTagList = () => {
    if(tags && tags.length > 0) {
      return tags.filter(tag => !categories.includes(tag)).map((tag, index) => {
        return (
          <View
            style={{ marginHorizontal: 5, marginBottom: 10 }}
            key={`tag-${index}`}
          >
            <BounceButton
              color={COLORS.tagBubbleBackground}
              onPress={() => {
                if(isEditing) {
                  setTags('tags', tags.filter((t) => t !== tag))
                }
              }}
              text={tag}
            />
          </View>
        );
      });
    } else {
      return null;
    }
  }

  const tagList = renderTagList();
  return (
    <View>
      {(isEditing || selectedTags && selectedTags.length > 0) && <Text style={styles.metadataTitle}>Type</Text>}
      <View style={styles.tagList}>{isEditing ? renderCategoryList(categories) : renderCategoryList(categories.filter(category => selectedTags.includes(category)))}</View>
      {(isEditing || tagList && tagList.length > 0) && <Text style={styles.metadataTitle}>Tags</Text>}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  tag: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 1,
    margin: 5,
  },
  metadataTitle: {
    color: COLORS.white,
    fontSize: FONT.SIZE.large,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5,
    marginLeft: 10,
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
    marginLeft: 15
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
