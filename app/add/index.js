import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import styles from '../../styles/AddDream.styles';
import { TextInput } from 'react-native'; 
import { COLORS } from '../../constants/theme';
import { router } from 'expo-router';
import { createDream } from '../../utils/db';

export default function AddPage() {
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const requiredFieldsArePopulated = (
        title && title.length > 0 && content && content.length > 0
    );

    const addDream = async () => {
        try {
            createDream(title, content);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: 'Add a Dream'
                }}
            />
            <View style={styles.container}>
                <TextInput
                    style={styles.title}
                    placeholder="Title"
                    placeholderTextColor={COLORS.white}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.content}
                    placeholder="Last Night I.."
                    placeholderTextColor={COLORS.white}
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical='top'
                    value={content}
                    onChangeText={setContent}
                />
                <TouchableOpacity 
                    style={requiredFieldsArePopulated ? styles.button : [styles.button, styles.disabledButton]}
                    onPress={addDream}
                    disabled={!requiredFieldsArePopulated}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}