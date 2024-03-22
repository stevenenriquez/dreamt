import { useLocalSearchParams, Stack, router } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image
} from 'react-native';
import { getDream } from '../../utils/db';
import styles from '../../styles/Dream.styles';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants/theme';
import { updateDream, deleteDream } from '../../utils/db';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageScrollView from '../../components/ImageScrollView/ImageScrollView';

export default function Dream() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [date, setDate] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [imagePaths, setImagePaths] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const requiredFieldsArePopulated =
    content && content.length > 0 && date.length > 0;

  const getDreamEntry = async () => {
    setIsLoading(true);
    const dream = await getDream(id);
    if (dream && dream.id > 0) {
      setTitle(dream.title || '');
      setContent(dream.content || '');
      setDate(dream.date || '');
      setImagePaths(JSON.parse(dream.imagePaths) || []);
      setEditingTitle(dream.title || '');
      setEditingContent(dream.content || '');
      setEditingDate(dream.date || '');
    }
    setIsLoading(false);
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (editingTitle.length === 0) {
        setEditingTitle(title);
      }
      if (editingContent.length === 0) {
        setEditingContent(content);
      }
      if (!editingDate) {
        setEditingDate(date);
      }
      await updateDream(id, editingTitle, editingContent, editingDate);
      await getDreamEntry();
      setIsEditing(false);
    } else if (editingContent.length > 0 && editingDate.length > 0) {
      setEditingTitle(title);
      setEditingContent(content);
      setEditingDate(date);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTitle(title);
    setEditingContent(content);
    setEditingDate(date);
  };

  const handleDelete = async () => {
    setConfirmationModalVisible(false);
    try {
      await deleteDream(id);
      router.push('/');
    } catch (error) {
      console.error('Error deleting dream: ', error);
    }
  };

  useEffect(() => {
    getDreamEntry();
  }, []);

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );

  const headerRightButtons = (
    <>
      <Pressable style={styles.deleteButton}>
        {isEditing ? (
          <Icon.Button
            onPress={
              isEditing ? handleCancel : () => setConfirmationModalVisible(true)
            }
            name="ban"
            size={20}
            color={COLORS.white}
            backgroundColor={COLORS.nearBlack}
            borderRadius={10}
            iconStyle={{ marginRight: 0 }}
          />
        ) : (
          <Icon.Button
            onPress={
              isEditing ? handleCancel : () => setConfirmationModalVisible(true)
            }
            name="trash"
            size={20}
            color={COLORS.white}
            backgroundColor={COLORS.nearBlack}
            borderRadius={10}
            iconStyle={{ marginRight: 0 }}
          />
        )}
      </Pressable>
      <Pressable
        disabled={requiredFieldsArePopulated}
        style={styles.editButton}
      >
        {isEditing ? (
          <Icon.Button
            onPress={handleEdit}
            name="save"
            size={20}
            color={COLORS.white}
            backgroundColor={COLORS.nearBlack}
            borderRadius={10}
            iconStyle={{ marginRight: 0 }}
          />
        ) : (
          <Icon.Button
            onPress={handleEdit}
            name="edit"
            size={20}
            color={COLORS.white}
            backgroundColor={COLORS.nearBlack}
            borderRadius={10}
            iconStyle={{ marginRight: 0 }}
          />
        )}
      </Pressable>
    </>
  );

  const dreamTitle = isEditing ? (
    <TextInput
      style={[styles.title, styles.editingTitle]}
      placeholder="Untitled"
      placeholderTextColor={COLORS.lightGray}
      value={editingTitle}
      onChangeText={setEditingTitle}
      editable={isEditing}
      multiline={true}
    />
  ) : (
    title &&
    title.length > 0 && (
      <Text selectable style={styles.title}>
        {title}
      </Text>
    )
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
      <Text selectable style={styles.text}>
        {content}
      </Text>
    </ScrollView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: isEditing ? 'Editing' : '',
          headerStyle: {
            backgroundColor: COLORS.backgroundPrimary,
            color: COLORS.textPrimary
          },
          headerRight: () => requiredFieldsArePopulated && headerRightButtons
        }}
      />
      {confirmationModalVisible && (
        <ConfirmationModal
          visible={confirmationModalVisible}
          closeModal={() => setConfirmationModalVisible(false)}
          modalText="Are you sure you want to delete this dream?"
          modalAction={handleDelete}
          modalActionText="Delete"
        />
      )}
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.date}>{new Date(date).toDateString()}</Text>
          {dreamTitle}
          {dreamContent}
          <ImageScrollView imagePaths={imagePaths} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
