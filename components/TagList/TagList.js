import { Pressable, View, Text } from 'react-native';
import { styles } from './TagList.styles';

export default function TagList(props) {
  const tagList =
    props.tags &&
    props.tags.length > 0 &&
    props.tags.map((tag, index) => {
      return (
        <Pressable
          key={`tag-${index}`}
          style={styles.tag}
          onPress={() => props.setTags(props.tags.filter((t) => t !== tag))}
        >
          <Text style={styles.tagText}>{tag}</Text>
        </Pressable>
      );
    });

  return (
    <>
      <View style={styles.toggleContainer}>{tagList}</View>
    </>
  );
}
