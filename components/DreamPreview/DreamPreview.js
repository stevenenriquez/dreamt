import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import styles from './DreamPreview.styles';

export default function DreamPreview(props) {
        
    return (
        <Link href={`/dream/${props.id}`}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{props.title || 'N/A'}</Text>
                    <TouchableOpacity style={styles.button} onPress={props.deleteDream}>
                        <Text style={styles.text}>X</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.date}>12/12/12</Text>
                <Text style={styles.text}>{props.content || 'Empty'}</Text>
            </View>
        </Link>
    )
}