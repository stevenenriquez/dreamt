import { Pressable, Text, View, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import styles from './DreamPreview.styles';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ImageScrollView from '../ImageScrollView/ImageScrollView';

export default function DreamPreview(props) {

    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

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
                <TouchableOpacity onPress={() => setConfirmationModalVisible(true)}>
                    <Text style={styles.modalOption}>Delete</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )

    return (
        <>
            {confirmationModalVisible 
                && <ConfirmationModal 
                        visible={confirmationModalVisible} 
                        closeModal={() => {
                            deselectDream();
                            setConfirmationModalVisible(false);
                        }} 
                        modalText="Are you sure you want to delete this dream?" 
                        modalAction={() => {
                            props.deleteDream();
                            deselectDream();
                            setConfirmationModalVisible(false);
                        }}
                        modalActionText="Delete"
                    />
            }
            <View style={selected ? [styles.container, styles.selectedContainer] : styles.container}>
                {modalVisible && dreamOptionsModal}
                <Pressable onPress={() => router.push(`/dream/${props.id}`)} onLongPress={longPressDream}>
                    <Text style={styles.date}>{new Date(props.date).toDateString()}</Text>
                    {props.title && (
                        <View style={styles.header}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    )}
                    <Text numberOfLines={3} style={styles.text}>{props.content || 'Empty'}</Text>
                </Pressable>
                <View style={styles.imagesContainer}>
                    <ImageScrollView imagePaths={JSON.parse(props.imagePaths)} />
                </View>
            </View>
        </>
    )
}