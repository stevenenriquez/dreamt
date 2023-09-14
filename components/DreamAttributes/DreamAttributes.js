import { Pressable, View, Text } from "react-native";
import { useState } from 'react';
import { styles } from './DreamAttributes.styles';

export default function DreamAttributes() {
    const [isLucid, setIsLucid] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [isNightmare, setIsNightmare] = useState(false);
    const [isSleepParalysis, setIsSleepParalysis] = useState(false);
    const [isFalseAwakening, setIsFalseAwakening] = useState(false);
    
    return (
        <>
            <View style={styles.toggleContainer}>
                <Pressable style={isLucid ? styles.selectedButton : styles.unselectedButton} onPress={() => setIsLucid(!isLucid)}>
                    <Text style={isLucid ? styles.selectedButtonText : styles.unselectedButtonText}>Lucid</Text>
                </Pressable>
                <Pressable style={isRecurring ? styles.selectedButton : styles.unselectedButton} onPress={() => setIsRecurring(!isRecurring)}>
                    <Text style={isRecurring ? styles.selectedButtonText : styles.unselectedButtonText}>Recurring</Text>
                </Pressable>
                <Pressable style={isNightmare ? styles.selectedButton : styles.unselectedButton} onPress={() => setIsNightmare(!isNightmare)}>
                    <Text style={isNightmare ? styles.selectedButtonText : styles.unselectedButtonText}>Nightmare</Text>
                </Pressable>
                <Pressable style={isSleepParalysis ? styles.selectedButton : styles.unselectedButton} onPress={() => setIsSleepParalysis(!isSleepParalysis)}>
                    <Text style={isSleepParalysis ? styles.selectedButtonText : styles.unselectedButtonText}>Sleep Paralysis</Text>
                </Pressable>
                <Pressable style={isFalseAwakening ? styles.selectedButton : styles.unselectedButton} onPress={() => setIsFalseAwakening(!isFalseAwakening)}>
                    <Text style={isFalseAwakening ? styles.selectedButtonText : styles.unselectedButtonText}>False Awakening</Text>
                </Pressable>
            </View>
        </>
    )
}