import { useLocalSearchParams, Stack, router } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { getDream } from '../../utils/db';
import styles from '../../styles/Dream.styles';
import { useEffect, useState } from "react";
import { COLORS } from "../../constants/theme";
import { updateDream, deleteDream } from "../../utils/db";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

export default function Dream() {
    const { id } = useLocalSearchParams();

    const [title, setTitle] = useState('');
    const [editingTitle, setEditingTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [date, setDate] = useState('');
    const [editingDate, setEditingDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

    const requiredFieldsArePopulated = (
        title && title.length > 0 && content && content.length > 0 && date.length > 0
    );

    const getDreamEntry = async () => {
        setIsLoading(true);
        const dream = await getDream(id);
        if(dream && dream.rows && dream.rows._array && dream.rows._array.length > 0) {
            setTitle(dream.rows._array[0].title || '');
            setContent(dream.rows._array[0].content || '');
            setDate(dream.rows._array[0].date || '');
            setEditingTitle(dream.rows._array[0].title || '');
            setEditingContent(dream.rows._array[0].content || '');
            setEditingDate(dream.rows._array[0].date || '');
        }
        setIsLoading(false);
    }

    const handleEdit = async () => {
        if(isEditing) {
            if(editingTitle.length === 0) {
                setEditingTitle(title);
            }
            if(editingContent.length === 0) {
                setEditingContent(content);
            }
            if(!editingDate) {
                setEditingDate(date);
            }
            await updateDream(id, editingTitle, editingContent, editingDate);
            await getDreamEntry();
            setIsEditing(false);
        } else if(editingTitle.length > 0 && editingContent.length > 0 && editingDate.length > 0) {
            setEditingTitle(title);
            setEditingContent(content);
            setEditingDate(date);
            setIsEditing(true);
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditingTitle(title);
        setEditingContent(content);
        setEditingDate(date);
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
            <TouchableOpacity style={styles.deleteButton} onPress={isEditing ? handleCancel : () => setConfirmationModalVisible(true)}>
                <Text style={styles.text}>{isEditing ? 'Cancel' : 'Delete'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={requiredFieldsArePopulated ? styles.editButton : [styles.editButton, styles.disabledButton]} onPress={handleEdit}>
                <Text style={styles.text}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
        </>
    );

    const dreamTitle = isEditing ? (
        <TextInput
            style={[styles.title, styles.editingTitle]}
            placeholder="Title"
            placeholderTextColor={COLORS.white}
            value={editingTitle}
            onChangeText={setEditingTitle}
            editable={isEditing}
            multiline={true}
        />
    ) : (
        <Text selectable style={styles.title}>{title && title.length > 0 ? title : new Date(date).toLocaleDateString()}</Text>
    );

    const dreamContent = isEditing ? (
        <TextInput
            style={[styles.editingContent, styles.editingField]}
            placeholder="Last Night I.."
            placeholderTextColor={COLORS.white}
            value={editingContent}
            multiline={true}
            onChangeText={setEditingContent}
            scrollEnabled={true}
            editable={isEditing}
        />
    ) : (
        <ScrollView style={styles.content}>
            <Text selectable style={styles.text}>{content}</Text>
        </ScrollView>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: isEditing ? 'Editing' : '',
                    headerRight: () => (
                        requiredFieldsArePopulated && headerRightButtons
                    ),
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
            <SafeAreaView style={styles.container}>
                {dreamTitle}
                {title && title.length > 0 ? <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text> : null}
                {dreamContent}
            </SafeAreaView>
        </>
    )
}