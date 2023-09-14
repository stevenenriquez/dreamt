import { Modal, Text, View, TouchableOpacity } from "react-native";
import styles from "./ConfirmationModal.styles";

export default function ConfirmationModal(props) {
    return (
        <>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={props.visible}
                onRequestClose={props.closeModal}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{props.modalText}</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={props.closeModal}>
                            <Text style={styles.button}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.modalAction}>
                            <Text style={styles.button}>{props.modalActionText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}