import { useState } from 'react';
import { storeImages, createDream } from '../../utils/db';
import DreamLayout from '../../components/DreamLayout/DreamLayout';
import { Stack, router } from 'expo-router';
import { PATH } from '../../constants/constants';
import { COLORS, FONT } from '../../constants/theme';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CreateDreamPage() {
  const [dream, setDream] = useState({
      id: null,  
      title: '',
      date: new Date(),
      tags: [],
      notes: '',
      clarity: 3,
      content: '',
      images: []
  });

  const requiredFieldsArePopulated = dream.content && dream.content.length > 0;

  const handleSave = async () => {
    if(requiredFieldsArePopulated) {
      try {
        const storedImages = dream.images?.length > 0 ? await storeImages(images) : [];
        const createdDream = await createDream(dream, storedImages);

        if(createdDream?.lastInsertRowId > 0) {
          router.replace(PATH.DREAM + '/' + createdDream.lastInsertRowId);
        } else {
          console.error('Error adding dream (missing lastInsertRowId): ', createdDream);
        }
      } catch (error) {
        console.log('Error creating dream: ', error);
      }
    }
  }

  const headerRightButton = (
    <Pressable
      style={
        requiredFieldsArePopulated
          ? styles.button
          : [styles.button, styles.disabledButton]
      }
      disabled={!requiredFieldsArePopulated}
      onPress={handleSave}
    >
      <MaterialIcons size={28} name="save-alt" color={COLORS.white} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerRight: () => headerRightButton,
          headerStyle: {
            backgroundColor: COLORS.backgroundPrimary,
            color: COLORS.textPrimariy
          },
          headerShadowVisible: false,
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            color: COLORS.white,
            fontFamily: FONT.family
          },
          animation: 'fade'
        }}
      />
      <DreamLayout dream={dream} setDream={setDream} handleSave={handleSave} isEditing={true} />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight: 5
  },
  disabledButton: {
    opacity: 0.3
  }
});