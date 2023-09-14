import { useLocalSearchParams, Stack, router } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { getDream } from '../../utils/db';
import styles from '../../styles/Dream.styles';
import { useEffect, useState } from "react";
import { COLORS } from "../../constants/theme";
import { updateDream, deleteDream } from "../../utils/db";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

export default function Dream() {
    const { id } = useLocalSearchParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

    const requiredFieldsArePopulated = (
        title && title.length > 0 && content && content.length > 0
    );

    const getDreamEntry = async () => {
        setIsLoading(true);
        const dream = await getDream(id);
        if(dream && dream.rows && dream.rows._array && dream.rows._array.length > 0) {
            setTitle(dream.rows._array[0].title || 'Dream Not Found');
            setContent(dream.rows._array[0].content || '');
        }
        setIsLoading(false);
    }

    const handleEdit = async () => {
        if(isEditing) {
            await updateDream(id, title, content);
        }
        setIsEditing(!isEditing);
    }

    const handleDelete = async () => {
        setConfirmationModalVisible(false);
        try {
            await deleteDream(id);
            router.push('/');
        } catch(error) {
            console.error('Error deleting dream: ', error)
        }
    }

    useEffect(() => {
        getDreamEntry();
    }, []);

    if(isLoading) return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.white} />
        </View>
    );

    const headerRightButtons = (
        <>
            <TouchableOpacity style={styles.deleteButton} onPress={() => setConfirmationModalVisible(true)}>
                <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.text}>{isEditing ? 'Done' : 'Edit'}</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: isEditing ? 'Editing' : '',
                    headerRight: () => (
                        requiredFieldsArePopulated && headerRightButtons
                    )
                }}
            />
            {confirmationModalVisible 
                && <ConfirmationModal 
                        visible={confirmationModalVisible} 
                        closeModal={() => setConfirmationModalVisible(false)} 
                        modalText="Are you sure you want to delete this dream?" 
                        modalAction={handleDelete}
                        modalActionText="Delete"
                    />
            }
            <View style={styles.container}>
            <TextInput
                    style={styles.title}
                    placeholder="Title"
                    placeholderTextColor={COLORS.white}
                    value={title}
                    onChangeText={setTitle}
                    editable={isEditing}
                />
            <Text style={styles.date}>12/12/12</Text>
            <TextInput
                    style={styles.content}
                    placeholder="Last Night I.."
                    placeholderTextColor={COLORS.white}
                    value={content}
                    onChangeText={setContent}
                    editable={isEditing}
            />
            </View>
        </>
    )
}