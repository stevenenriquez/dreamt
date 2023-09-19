import { useState } from 'react';
import { Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, View, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import styles from '../../styles/AddDream.styles';
import { COLORS } from '../../constants/theme';
import { createDream } from '../../utils/db';
import TagList from '../../components/TagList/TagList';
import { DatePickerModal } from 'react-native-paper-dates';
import { MD3DarkTheme, PaperProvider, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function AddPage() {
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [tagSearchText, setTagSearchText] = useState('');
    const [tags, setTags] = useState([]);
    const [notes, setNotes] = useState('');
    const [clarity, setClarity] = useState(1);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const requiredFieldsArePopulated = (
        content && content.length > 0
    );

    const addDream = async () => {
        try {
            await createDream(title, content, date.toISOString());
            router.push('/');
        } catch (error) {
            console.error('Error adding dream: ', error);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 3,
        });
        
        if (!result.canceled) {
            setImages(prevImages => {
                let selectedImages = [...prevImages] || [];
                result.assets.forEach(asset => {
                    if(selectedImages.length < 3) {
                        selectedImages.push(asset.uri);
                    }
                });
                return selectedImages;
            })
        }
    };

    const handleTagSearchTextChange = text => {
        setTagSearchText(text);
        if(text.endsWith(' ')) {
            if(text.trim().length > 0 && !tags.includes(text.trim()) && !text.trim().includes(' ')) {
                setTags(prevTags => {
                    let newTags = [...prevTags];
                    newTags.push(text.trim());
                    return newTags;
                });
            }
            setTagSearchText('');
        }
    }

    const noImageContainer = (
        <TouchableOpacity onPress={pickImage} activeOpacity={1} style={styles.noImagesContainer}>
            <Text style={styles.noImagesText}>+</Text>
        </TouchableOpacity>
    );

    const uploadedImages = (
        images && images.length > 0 ? (
            <ScrollView horizontal={true}>
                {images.map(imgUri => (
                    <View style={styles.selectedImageContainer}>
                        <TouchableOpacity onPress={()=> {
                            setImages(images.filter(img => img !== imgUri));
                        }} style={styles.deleteImageButton}>
                            <Text style={styles.deleteImageButtonText}>X</Text>
                        </TouchableOpacity>
                        <Image source={{ uri: imgUri }} style={styles.selectedImage} />
                    </View>
                ))}
                {images.length < 3 && noImageContainer}
            </ScrollView>
        ) : noImageContainer
    );

    const headerRightButton = (
        <TouchableOpacity
            style={requiredFieldsArePopulated ? styles.button : [styles.button, styles.disabledButton]}
            onPress={addDream}
            disabled={!requiredFieldsArePopulated}
        >
            <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
    );

    const portalTheme = {
        ...MD3DarkTheme,
        colors: {
            ...MD3DarkTheme.colors,
            primary: '#AAA',
            secondary: COLORS.white,
            background: COLORS.backgroundPrimary,
            backgroundVariant: COLORS.black,
            surface: COLORS.black,
            surfaceVariant: COLORS.black,
        },
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        headerRightButton
                    ),
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
                <ScrollView>
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
                            textAlignVertical='top'
                            value={content}
                            onChangeText={setContent}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Images</Text>
                        {uploadedImages}
                    </View>
                    {/* Add ability to create dream video after saving the dream */}
                    {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Dream Video</Text>
                        <TouchableOpacity onPress={pickImage} activeOpacity={1} style={styles.noVideoContainer}/>
                    </View> */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tags</Text>
                        <View style={styles.tagList}>
                            <TagList tags={tags} setTags={setTags}/>
                        </View>
                        <TextInput
                            style={styles.text}
                            placeholder="Enter tags separated by spaces"
                            placeholderTextColor={COLORS.lightGray}
                            value={tagSearchText}
                            onChangeText={handleTagSearchTextChange}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Clarity</Text>
                        <Image source={require('../../assets/clarity.png')} style={styles.clarityImage} blurRadius={parseInt(clarity) || 1} />
                        <TextInput 
                            style={styles.text} 
                            placeholder="Soon to be a slider" 
                            placeholderTextColor={COLORS.lightGray}
                            value={clarity}
                            onChangeText={setClarity}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Notes</Text>
                        <TextInput
                            style={styles.notes}
                            placeholder="Any additional notes"
                            placeholderTextColor={COLORS.lightGray}
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical='top'
                            value={notes}
                            onChangeText={setNotes}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}