import { useState } from 'react';
import { Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Stack, router } from 'expo-router';
import styles from '../../styles/AddDream.styles';
import { COLORS } from '../../constants/theme';
import { createDream } from '../../utils/db';
import DreamAttributes from '../../components/DreamAttributes/DreamAttributes';
import { DatePickerModal } from 'react-native-paper-dates';
import { MD3DarkTheme, Modal, PaperProvider, Portal } from 'react-native-paper';

export default function AddPage() {
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [content, setContent] = useState('');
    const requiredFieldsArePopulated = (
        title && title.length > 0 && content && content.length > 0
    );

    const addDream = async () => {
        try {
            await createDream(title, content, date.toISOString());
            router.push('/');
        } catch (error) {
            console.error('Error adding dream: ', error);
        }
    };

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
                <TextInput
                        style={title.length > 0 ? styles.title : [styles.title, styles.textInputPlaceholder]}
                        placeholder="Title"
                        placeholderTextColor={COLORS.white}
                        value={title}
                        onChangeText={setTitle}
                        multiline
                        maxLength={50}
                    />
                <ScrollView>
                    <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                        <Text style={styles.date}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={content.length > 0 ? styles.content : [styles.content, styles.textInputPlaceholder]}
                        placeholder="Last Night I.."
                        placeholderTextColor={COLORS.white}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical='top'
                        value={content}
                        onChangeText={setContent}
                    />
                    <DreamAttributes />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}