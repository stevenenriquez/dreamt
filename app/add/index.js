import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  Pressable
} from 'react-native';
import { Stack, router } from 'expo-router';
import styles from '../../styles/AddDream.styles';
import { COLORS, FONT } from '../../constants/theme';
import {
  createDream,
} from '../../utils/db';
import { DatePickerModal } from 'react-native-paper-dates';
import { MD3DarkTheme, PaperProvider, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DreamCategories from '../../components/DreamCategories/DreamCategories';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { storeImages } from '../../utils/fileSystem';
import { PATH } from '../../constants/constants';
import BounceButton from '../../components/BounceButton/BounceButton';

export default function Tab() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState('');
  const [clarity, setClarity] = useState(5);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [adjustingClarity, setAdjustingClarity] = useState(false);
  const [toggleNote, setToggleNote] = useState(false);

  let clarityTimeout;

  const requiredFieldsArePopulated = content && content.length > 0;

  const addDream = async () => {
    try {
      const storedImages = images?.length > 0 ? await storeImages(images) : [];
      const dream = await createDream(
        title,
        content,
        date.toISOString(),
        JSON.stringify(storedImages),
        clarity,
        notes,
        tags
      );
      
      if (dream?.lastInsertRowId > 0) {
        router.replace(PATH.DREAM + '/' + dream.lastInsertRowId);
      } else {
        console.error('Error adding dream: ', dream);
      }
    } catch (error) {
      console.error('Error adding dream: ', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: images.length < 3 ? 3 - images.length : 0
    });

    if (!result.canceled) {
      setImages((prevImages) => {
        let selectedImages = [...prevImages] || [];
        result.assets.forEach((asset) => {
          if (selectedImages.length < 3) {
            selectedImages.push(asset.uri);
          }
        });
        return selectedImages;
      });
    }
  };

  const imageSelectionButton = (icon, text) => {
    return (
      <View style={styles.imageSelectButton}>
        <Icon.Button
          onPress={pickImage}
          name={icon}
          size={20}
          color={COLORS.white}
          backgroundColor={COLORS.nearBlack}
          borderRadius={10}
          iconStyle={{ marginRight: 0 }}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  const noImageContainer = (
    <View style={styles.noImagesContainer}>
      {imageSelectionButton('image', 'Upload')}
      {imageSelectionButton('rocket', 'Generate')}
    </View>
  );

  const uploadedImages =
    images && images.length > 0 ? (
      <ScrollView horizontal={true} nestedScrollEnabled={true}>
        {images.map((imgUri, index) => (
          <View key={`uploaded-img-${index}`}>
            <TouchableOpacity
              onPress={() => {
                setImages(images.filter((img) => img !== imgUri));
              }}
              style={styles.deleteImageButton}
            >
              <Text style={styles.deleteImageButtonText}>X</Text>
            </TouchableOpacity>
            <Image source={{ uri: imgUri }} style={styles.selectedImage} />
          </View>
        ))}
        {images.length < 3 && noImageContainer}
      </ScrollView>
    ) : (
      <View>{noImageContainer}</View>
    );

  const headerRightButton = (
    <Pressable
      style={
        requiredFieldsArePopulated
          ? styles.button
          : [styles.button, styles.disabledButton]
      }
      disabled={!requiredFieldsArePopulated}
      onPress={addDream}
    >
      <MaterialIcons size={28} name="save-alt" color={COLORS.white} />
    </Pressable>
  );

  // TODO: move this into utils.js and generalize it
  const debounce = (callback) => {
    return () => {
      clearTimeout(clarityTimeout);
      clarityTimeout = setTimeout(() => {
        callback();
      }, 200);
    };
  }

  const onClaritySlidingComplete = () => {
    clearTimeout(clarityTimeout);
    setAdjustingClarity(false);
  }

  const portalTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#AAA',
      secondary: COLORS.white,
      background: COLORS.backgroundPrimary,
      backgroundVariant: COLORS.black,
      surface: COLORS.black,
      surfaceVariant: COLORS.black
    }
  };

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
      <SafeAreaView style={styles.container}>
        <PaperProvider theme={portalTheme}>
          <Portal>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={datePickerVisible}
              onDismiss={() => setDatePickerVisible(false)}
              date={date}
              onConfirm={(date) => {
                setDate(new Date(date.date));
                setDatePickerVisible(false);
              }}
              saveLabel="Save"
              label="Select date"
              animationType="fade"
              startYear={1900}
              endYear={new Date().getFullYear()}
            />
          </Portal>
        </PaperProvider>
        {adjustingClarity && (  
          <View style={styles.clarityImageContainer}>
            <Image
              source={require('../../assets/clarity.png')}
              style={styles.clarityImage}
              blurRadius={clarity === 5 ? 0 : 5 - clarity}
            />
          </View>
        )}
        <ScrollView nestedScrollEnabled={true}>
          <TextInput
            style={styles.title}
            placeholder="Untitled"
            placeholderTextColor={COLORS.lightGray}
            value={title}
            onChangeText={setTitle}
            multiline
            maxLength={50}
          />
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <Text style={styles.date}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <View style={styles.section}>
            <TextInput
              style={styles.content}
              placeholder="Last Night I.."
              placeholderTextColor={COLORS.lightGray}
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />
          </View>
          {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Images</Text>
                        {uploadedImages}
                    </View> */}
          <View style={styles.section}>
          <DreamCategories tags={tags} setTags={setTags} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vivid</Text>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: FONT.fontSize,
                  width: 15
                }}
              >
                {clarity}
              </Text>
              <Slider
                style={styles.claritySlider}
                minimumValue={1}
                maximumValue={5}
                minimumTrackTintColor={COLORS.accent}
                maximumTrackTintColor={COLORS.white}
                thumbTintColor={COLORS.white}
                step={1}
                tapToSeek={true}
                value={clarity}
                onValueChange={setClarity}
                onSlidingStart={debounce(() => setAdjustingClarity(true), clarityTimeout)}
                onSlidingComplete={() => onClaritySlidingComplete()}
              />
            </View>
          </View>
          {toggleNote && <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TextInput
              style={styles.notes}
              placeholder="Any additional notes"
              placeholderTextColor={COLORS.lightGray}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>}
          {toggleNote ? <BounceButton text="Remove Notes" onPress={() => setToggleNote(false)} /> : <BounceButton text="Add Notes" onPress={() => {setNotes('');setToggleNote(true)}} />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
