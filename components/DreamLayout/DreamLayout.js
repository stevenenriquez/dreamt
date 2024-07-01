import { useState, useEffect, useRef } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import DreamCategories from '../DreamCategories/DreamCategories';
import DatePicker from '../DatePicker/DatePicker';
import Chat from '../Chat/Chat';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { selectImages } from '../../utils/utils';
import { RATE_LIMIT } from '../../constants/constants';
import BounceToggle from '../BounceToggle/BounceToggle';
import BounceButton from '../BounceButton/BounceButton';

const screenWidth = Dimensions.get('window').width;

export default function DreamLayout({ dream, setDream, isEditing }) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth) + 1;
    setCurrentPage(page);
  };

  const navigateToPage = (pageNumber) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: (pageNumber - 1) * screenWidth, animated: true });
    }
  };

  const handleDreamChange = (key, value) => {
    if(dream.hasOwnProperty(key)) {
      setDream((prevDream) => ({
        ...prevDream,
        [key]: value
      }));
    }
  };

  const imageSelectionButton = (icon, text) => {
    return (
      <View style={styles.imageSelectButton}>
        <Icon.Button
          onPress={() => selectImages({images: dream.images, handleImageSet: (newImages) => handleDreamChange('images', newImages)})}
          name={icon}
          size={20}
          color={COLORS.white}
          backgroundColor={COLORS.nearBlack}
          borderRadius={10}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  const addImageButton = (
    <View style={styles.imageSelectButton}>
      <BounceButton text='Add Image' color={COLORS.gray} onPress={() => setIsAddingImage(true)} />
    </View>
  );

  const noImageContainer = (
    <View style={styles.noImagesContainer}>
      {imageSelectionButton('image', 'Upload')}
      {imageSelectionButton('rocket', 'Generate')}
      {dream.images.length === 0 ? <TouchableOpacity onPress={() => setIsAddingImage(false)} style={styles.cancelButton}>
        <Icon name="times" size={20} color={COLORS.lightGray} />
      </TouchableOpacity> : null}
    </View>
  );

  const uploadedImages =
    dream.images && dream.images.length > 0 ? (
      <ScrollView horizontal={true} nestedScrollEnabled={true}>
        {dream.images.map((imgUri, index) => (
          <View key={`uploaded-img-${index}`}>
            {isEditing ? <TouchableOpacity
              onPress={() => {
                setImages(dream.images.filter((img) => img !== imgUri));
              }}
              style={styles.deleteImageButton}
            >
              <Text style={styles.deleteImageButtonText}>X</Text>
            </TouchableOpacity> : null}
            <Image source={{ uri: imgUri }} style={styles.selectedImage} />
          </View>
        ))}
        {dream.images.length < 3 && isEditing && <View style={{marginTop: 5}}>{noImageContainer}</View>}
      </ScrollView>
    ) : (
      isEditing ? isAddingImage ? <View>{noImageContainer}</View> : <View style={styles.addImagesContainer}>{addImageButton}</View> : null
    );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.pageTitleContainer}>
          <View style={styles.pageTitles}>
            <TouchableOpacity onPress={() => navigateToPage(1)}>
              <Text style={currentPage === 1 ? [styles.pageTitle, styles.activePageTitle] : styles.pageTitle}>Dream</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToPage(2)}>
              <Text style={currentPage === 2 ? [styles.pageTitle, styles.activePageTitle] : styles.pageTitle}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToPage(3)}>
              <Text style={currentPage === 3 ? [styles.pageTitle, styles.activePageTitle] : styles.pageTitle}>Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView ref={scrollViewRef} horizontal={true} onScroll={handleScroll} pagingEnabled snapToInterval={screenWidth} decelerationRate={0.8} showsHorizontalScrollIndicator={false} disableIntervalMomentum>
        <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
          <Text style={styles.date}>{new Date(dream.date).toLocaleDateString()}</Text>
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
          <View style={styles.uploadedImagesContainer}>{uploadedImages}</View>
          <View style={styles.section}>
            <View style={styles.contentContainer}>
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
          </View>
          {!isEditing && (
            <View style={styles.aiButtons}>
              <View style={styles.aiButton}>
                <BounceButton text='Analyze' color={COLORS.aiAccent} onPress={() => navigateToPage(3)} />
              </View>
            </View>
          )}
        </ScrollView>
        </View>
        <View style={styles.page}>
          <ScrollView>
          <Section title="General">
              <Detail title="Date" value={new Date(dream.date).toLocaleDateString()} />
              <Detail title="Clarity" value={<Text style={{color: 'white'}}>3/5</Text>} />
              <Detail title="Duration" value="Short" />
              <Detail title="Mood" value="Happy" />
          </Section>
          <Section title="Lucidity">
            <Detail title="Lucid" value="Yes" />
            <Detail title="Control" value="High" />
            <Detail title="Vividness" value="3/5" />
          </Section>
          <Section title="Symbols">
            <DreamCategories tags={dream.tags || []} setTags={handleDreamChange} isEditing={isEditing} />
          </Section>
          </ScrollView>
        </View>
        <View style={styles.page}>
          <ScrollView>
          <Section title="Dream Interpreation ✨" styling={{backgroundColor: COLORS.aiAccent}}>
              <Text style={styles.interpretationText}>In your dream, you find yourself swimming in a vast, crystal-clear ocean. The water feels warm and comforting, symbolizing your emotional state and the unconscious mind. As you dive deeper, you encounter a sunken ship filled with treasure, representing hidden aspects of yourself or untapped potential waiting to be discovered. Schools of colorful fish dart around you, possibly signifying the diverse thoughts and ideas flowing through your mind. Suddenly, you spot a friendly dolphin that guides you to the surface. This dolphin could represent a supportive figure in your life or your own intuition leading you towards personal growth and enlightenment. Upon reaching the surface, you see a distant island, symbolizing a goal or destination you're striving towards in your waking life. This dream suggests a journey of self-discovery, emotional exploration, and the pursuit of personal aspirations.</Text>
              {!isAskingQuestion && <View style={styles.aiButton}>
                <BounceButton text='Ask Question' color={COLORS.white} textColor={COLORS.black} onPress={() => setIsAskingQuestion(true)} />
              </View>}
          </Section>
          {isAskingQuestion && <Section title="Chat">
            <Chat />
            <TextInput style={styles.message} placeholder="Type a message..." placeholderTextColor={COLORS.lightGray} multiline={true} numberOfLines={null} textAlignVertical="top" />
          </Section>}
        </ScrollView>
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const Section = ({ title, children, styling }) => (
  <View style={styling ? [sectionStyles.section, styling] : sectionStyles.section}>
    <Text style={sectionStyles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SectionElement = ({ title, children }) => (
  <View style={sectionStyles.sectionElement}>
    {title && <Text style={sectionStyles.sectionElementTitle}>{title}</Text>}
    {children}
  </View>
);

const Detail = ({ title, value }) => (
  <View style={sectionStyles.detail}>
    <Text style={sectionStyles.detailTitle}>{title}</Text>
    <Text style={sectionStyles.detailValue}>{value}</Text>
  </View>
);


const sectionStyles = StyleSheet.create({
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    borderRadius: 20
  },
  detailTitle: {
    fontSize: FONT.SIZE.large,
    color: COLORS.white,
    fontFamily: FONT.family,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  detailValue: {
    fontSize: FONT.SIZE.large,
    color: COLORS.white,
    fontFamily: FONT.family,
    marginRight: 5
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 10
  },
  sectionElement: {
    marginTop: 5,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: FONT.SIZE.xxlarge,
    color: COLORS.white,
    fontFamily: FONT.family,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5
  },
  sectionElementTitle: {
    fontSize: FONT.SIZE.large,
    color: COLORS.nearWhite,
    fontFamily: FONT.family,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5
  },
});

const styles = StyleSheet.create({
  addImagesContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    marginTop: 10,
    width: screenWidth,
    padding: 10
  },
  pageTitle: {
    color: COLORS.nearWhite,
    fontFamily: FONT.family,
    fontSize: 30,
  },
  pageTitles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 5,
  },
  pageTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  pageTitle: {
    color: COLORS.lightGray,
    fontFamily: FONT.family,
    fontSize: 15,
    letterSpacing: 1,
    backgroundColor: COLORS.black,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    fontWeight: 'bold'
  },
  activePageTitle: {
    color: COLORS.white,
    backgroundColor: COLORS.gray,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 5,
  },
  imageSelectionButtons: {
    flexDirection: 'row'
  },
  imageSelectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  contentFooter: {
    marginTop: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageButton: {
    margin: 5,
  },
  cancelButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.darkGray,
    padding: 5,
    margin: 5,
    borderRadius: 10
  },
  dreamInterpretation: {
    backgroundColor: COLORS.aiBackground,
    borderRadius: 20,
    padding: 10
  },
  aiButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  aiButton: {
    backgroundColor: COLORS.aiAccent,
    width: '100%',
    borderRadius: 30,
    padding: 5
  },
  date: {
    color: COLORS.lightGray,
    fontFamily: FONT.family,
    fontSize: 15,
    paddingLeft: 7
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  scrollViewContent: {
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
    fontWeight: 'bold',
    letterSpacing: 1,
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
    minHeight: 350,
    height: 'auto',
  },
  contentContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 20,
    padding: 10
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
    color: COLORS.white,
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
