import { useState } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import DreamCategories from '../DreamCategories/DreamCategories';
import DatePicker from '../DatePicker/DatePicker';
import Chat from '../Chat/Chat';

export default function DreamLayout({ dream, setDream, isEditing }) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleDreamChange = (key, value) => {
    if(dream.hasOwnProperty(key)) {
      setDream((prevDream) => ({
        ...prevDream,
        [key]: value
      }));
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isEditing && (
          <DatePicker
            date={dream.date}
            setDate={value => handleDreamChange('date', value)}
            datePickerVisible={datePickerVisible}
            setDatePickerVisible={setDatePickerVisible}
          />
        )}
        <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
          <TextInput
            style={styles.title}
            placeholder="Untitled"
            placeholderTextColor={COLORS.lightGray}
            value={dream.title}
            onChangeText={value => handleDreamChange('title', value)}
            multiline
            maxLength={50}
            readOnly={!isEditing}
          />
          <View style={styles.section}>
            <TextInput
              style={styles.content}
              placeholder="Last night I.."
              placeholderTextColor={COLORS.lightGray}
              multiline={true}
              numberOfLines={null}
              textAlignVertical="top"
              value={dream.content}
              onChangeText={value => handleDreamChange('content', value)}
              readOnly={!isEditing}
            />
          </View>
          <View style={styles.section}>
            <DreamCategories tags={dream.tags || []} setTags={handleDreamChange} isEditing={isEditing} />
          </View>
          <View style={styles.dreamInterpretation}>
            <Text style={styles.sectionTitle}>Dream Interpreation ✨</Text>
            <Text style={styles.interpretationText}>In your dream, you find yourself swimming in a vast, crystal-clear ocean. The water feels warm and comforting, symbolizing your emotional state and the unconscious mind. As you dive deeper, you encounter a sunken ship filled with treasure, representing hidden aspects of yourself or untapped potential waiting to be discovered. Schools of colorful fish dart around you, possibly signifying the diverse thoughts and ideas flowing through your mind. Suddenly, you spot a friendly dolphin that guides you to the surface. This dolphin could represent a supportive figure in your life or your own intuition leading you towards personal growth and enlightenment. Upon reaching the surface, you see a distant island, symbolizing a goal or destination you're striving towards in your waking life. This dream suggests a journey of self-discovery, emotional exploration, and the pursuit of personal aspirations.</Text>
            <Chat />
            <TextInput style={styles.message} placeholder="Ask a question..." placeholderTextColor={COLORS.lightGray} multiline={true} numberOfLines={null} textAlignVertical="top" />
          </View>
          {/* {!isEditing && <View style={styles.aiButtons}>
            <View style={styles.aiButton}>
              <BounceButton text='Interpret' color={COLORS.aiAccent} />
            </View>
            <BounceButton text='Explore' color={COLORS.aiAccent} />
          </View>} */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  dreamInterpretation: {
    backgroundColor: COLORS.aiBackground,
    padding: 10,
    borderRadius: 20,
  },
  aiButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  aiButton: {
    marginRight: 15
  },
  date: {
    color: COLORS.lightGray,
    fontFamily: FONT.family,
    marginBottom: 10,
    fontSize: 12
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.black,
    padding: 20
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 60
  },
  headerDate: {
    color: COLORS.white,
    fontFamily: FONT.family,
    marginRight: 30,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 20,
    padding: 10
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    marginBottom: 10,
    marginLeft: 5
  },
  title: {
    fontSize: 30,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 5,
    paddingLeft: 5,
    borderRadius: 10,
    marginBottom: 10
  },
  datePicker: {
    color: COLORS.white,
    opacity: 0.7,
    fontFamily: FONT.family,
    marginBottom: 10,
    marginLeft: 20
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.family
  },
  content: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 15,
    borderRadius: 20,
    minHeight: 350,
    height: 'auto',
    backgroundColor: COLORS.nearBlack,
    borderWidth: 2
  },
  message: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 15,
    borderRadius: 20,
    height: 'auto',
    maxHeight: 300,
    backgroundColor: COLORS.nearBlack,
    borderWidth: 2
  },
  interpretationText: {
    fontSize: 15,
    color: COLORS.aiLightText,
    fontFamily: FONT.family,
    padding: 15,
  },
  button: {
    marginRight: 5
  },
  headerButton: {
    marginRight: 10
  },
  disabledButton: {
    opacity: 0.3
  },
  buttonText: {
    fontFamily: FONT.family,
    fontSize: 15,
    color: COLORS.white
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 5
  },
  imageSelectionButtons: {
    flexDirection: 'row'
  },
  imageSelectButton: {
    padding: 7,
    width: '90%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noImagesContainer: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: COLORS.nearBlack,
    borderColor: COLORS.gray,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSelectText: {
    color: COLORS.white,
    fontFamily: FONT.family,
    fontSize: 15
  },
  tagList: {
    marginTop: 5,
    marginBottom: 5
  },
  deleteImageButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    borderColor: COLORS.white,
    borderWidth: 1,
    zIndex: 1
  },
  deleteImageButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
