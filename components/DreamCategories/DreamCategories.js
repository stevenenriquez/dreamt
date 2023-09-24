import { View, TextInput, Pressable, Text, ScrollView } from "react-native";
import { COLORS } from "../../constants/theme";
import { useState } from "react";
import styles from "./DreamCategories.styles";

const categories = ["Lucid", "Recurring", "Nightmare", "False Awakening", "Sleep Paralysis"];

export default function DreamCategories(props) {

    const [tagSearchText, setTagSearchText] = useState('');

    const handleTagSearchTextChange = text => {
        setTagSearchText(text);
        if(text.endsWith(' ')) {
            if(text.trim().length > 0 && !props.tags.includes(text.trim()) && !text.trim().includes(' ')) {
                props.setTags(prevTags => {
                    let newTags = [...prevTags];
                    newTags.push(text.trim());
                    return newTags;
                });
            }
            setTagSearchText('');
        }
    };

    const commonTags = (
        categories.map((category, index) => {
            return (
                <Pressable key={`category-${index}`} style={styles.category} onPress={() => props.setTags(props.tags.filter(t => t !== category))}>
                    <Text style={styles.tagText}>{category}</Text>
                </Pressable>
            );
        })
    );

    const tagList = (
        props.tags && props.tags.length > 0 && props.tags.map((tag, index) => {
            return (
                <Pressable key={`tag-${index}`} style={styles.tag} onPress={() => props.setTags(props.tags.filter(t => t !== tag))}>
                    <Text style={styles.tagText}>{tag}</Text>
                </Pressable>
            );
        })
    );

    return (
        <View>
            <Text style={styles.tagTitle}>Categories</Text>
            <ScrollView horizontal={true}>
                {commonTags}
            </ScrollView>
            <Text style={styles.tagTitle}>Other</Text>
            <View style={styles.tagList}>
                {tagList}
            </View>
            <TextInput
                style={styles.tagSearchText}
                placeholder="Enter other tags separated by spaces"
                placeholderTextColor={COLORS.lightGray}
                value={tagSearchText}
                onChangeText={handleTagSearchTextChange}
            />
        </View>
    )
}