import { Pressable, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import styles from './DreamPreview.styles';

export default function DreamPreview(props) {

    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(false);

    const longPressDream = () => {
        setModalVisible(true);
        setSelected(true);
    }

    const deselectDream = () => {
        setModalVisible(false);
        setSelected(false);
    }

    const dreamOptionsModal = (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={deselectDream}
        >
            <View style={styles.modal}>
                <TouchableOpacity onPress={deselectDream}>
                    <Text style={styles.modalOption}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.deleteDream}>
                    <Text style={styles.modalOption}>Delete</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )

    return (
        <View style={selected ? [styles.container, styles.selectedContainer] : styles.container}>
            {modalVisible && dreamOptionsModal}
            <Pressable onPress={() => router.push(`/dream/${props.id}`)} onLongPress={longPressDream}>
                <View style={styles.header}>
                    <Text style={styles.title}>{props.title || 'N/A'}</Text>
                </View>
                <Text style={styles.date}>12/12/12</Text>
                <Text numberOfLines={3} style={styles.text}>{props.content || 'Empty'}</Text>
            </Pressable>
        </View>
    )
}