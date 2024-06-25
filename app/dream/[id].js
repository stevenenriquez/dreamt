import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { deleteDream, getDream, updateDream } from '../../utils/db';
import DreamLayout from '../../components/DreamLayout/DreamLayout';
import { COLORS, FONT } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

export default function DreamPage() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [dream, setDream] = useState({
    id: null,
    title: [],
    date: new Date(),
    tags: [],
    notes: '',
    clarity: 3,
    content: '',
    images: []
  });
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const requiredFieldsArePopulated = dream.content && dream.content.length > 0;

  const retrieveDream = async () => {
    setIsLoading(true);
    const retrievedDream = await getDream(id);
    if(retrievedDream && retrievedDream.id > 0) {
      setDream(prevDream => ({
        ...prevDream,
        ...retrievedDream,
        tags: retrievedDream?.tags?.split(',')
      }));
    }
    setIsLoading(false);
  }

  const handleEdit = async () => {
    if(isEditing) {
      if(dream.id > 0) {
        setIsLoading(true);
        try {
          await updateDream(dream);
        } catch (error) {
          console.error(`Error editing dream (ID: ${dream.id}): ${error}`);
        }
        setIsEditing(false);
        setIsLoading(false);
      }
  } else {
    setIsEditing(true);
  }
}

  const handleCancel = () => {
    setIsEditing(false);
    retrieveDream(id);
  }

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
    retrieveDream(id);
  }, []);

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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: isEditing ? 'Editing' : '',
          headerTitleStyle: {
            color: COLORS.white,
            fontFamily: FONT.family
          },
          headerStyle: {
            backgroundColor: COLORS.backgroundPrimary,
            color: COLORS.white
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
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={COLORS.white} />
        </View>
      ) : (
        dream.id > 0 ? (
          <DreamLayout dream={dream} setDream={setDream} handleSave={isEditing ? handleEdit : null} isEditing={isEditing} />
        ) : <Dream404 />
      )}
    </>
  )
}

// move to separate file
const Dream404 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.white}}>Dream Not Found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: 20
  },
  deleteButton: {
    marginRight: 25
  },
  editButton: {
    marginRight: 5
  }
});