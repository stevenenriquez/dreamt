import { useState } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import DreamCategories from '../DreamCategories/DreamCategories';
import Slider from '@react-native-community/slider';
import BounceButton from '../BounceButton/BounceButton';
import DatePicker from '../DatePicker/DatePicker';

export default function DreamLayout({ dream, setDream, isEditing }) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [adjustingClarity, setAdjustingClarity] = useState(false);
  const [toggleNote, setToggleNote] = useState(false);

  const handleDreamChange = (key, value) => {
    // if(key === 'tags' && typeof value === 'string') {
    //   value = value.split(',');
    // }
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
        {isEditing && adjustingClarity && (
          <View style={styles.clarityImageContainer}>
            <Image
              source={require('../../assets/clarity.png')}
              style={styles.clarityImage}
              blurRadius={dream.clarity === 5 ? 0 : 5 - dream.clarity}
            />
          </View>
        )}
        <ScrollView nestedScrollEnabled={true}>
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
          {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Images</Text>
                        {uploadedImages}
                    </View> */}
          <View style={styles.section}>
            <DreamCategories tags={dream.tags} setTags={handleDreamChange} />
          </View>
          {isEditing && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clarity 👁</Text>
              <View style={{ flex: 1, flexDirection: 'space-between' }}>
                <Slider
                  style={styles.claritySlider}
                  minimumValue={1}
                  maximumValue={5}
                  minimumTrackTintColor={COLORS.accent}
                  maximumTrackTintColor={COLORS.white}
                  thumbTintColor={COLORS.white}
                  step={1}
                  tapToSeek={true}
                  value={dream.clarity}
                  onValueChange={value => handleDreamChange('clarity', value)}
                  disabled={!isEditing}
                  onSlidingStart={() => clarityImageTimeout.debouncedFn()}
                  onSlidingComplete={() => onClaritySlidingComplete()}
                />
              </View>
            </View>
          )}
          {((isEditing && toggleNote) ||
            (!isEditing && dream.notes.length > 0)) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notes</Text>
                <TextInput
                  style={styles.notes}
                  placeholder="Any additional notes"
                  placeholderTextColor={COLORS.lightGray}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={dream.notes}
                  onChangeText={value => handleDreamChange('notes', value)}
                  readOnly={!isEditing}
                />
              </View>
            )}
          {isEditing &&
            (toggleNote ? (
              <BounceButton
                text="Remove Notes"
                onPress={() => setToggleNote(false)}
              />
            ) : (
              <BounceButton
                text="Add Notes"
                onPress={() => {
                  handleDreamChange('notes', '');
                  setToggleNote(true);
                }}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.black,
    padding: 20
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
  date: {
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
  notes: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 20,
    borderRadius: 30,
    height: 200,
    backgroundColor: COLORS.nearBlack,
    marginBottom: 20,
    paddingBottom: 50
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
  noVideoContainer: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: 2
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
  },
  clarityImageContainer: {
    flex: 1,
    zIndex: 9999
  },
  clarityImage: {
    width: '100%',
    height: 150,
    borderRadius: 20
  },
  claritySlider: {
    marginBottom: 10
  }
});
