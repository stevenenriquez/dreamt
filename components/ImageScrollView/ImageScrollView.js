import React, { useState } from 'react';
import { ScrollView, Image, View, Modal, Pressable } from 'react-native';
import styles from './ImageScrollView.styles';

// TODO: Look into expo's react-native-pager-view

const ImageScrollView = ({ imagePaths }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImagePress = (imagePath) => {
    setSelectedImage(imagePath);
    toggleModal();
  };

  const getNextImage = () => {
    if (imagePaths.length === 1) return;
    const imageIndex = imagePaths.indexOf(selectedImage);
    if (imageIndex < imagePaths.length - 1) {
      setSelectedImage(imagePaths[imageIndex + 1]);
    } else {
      setSelectedImage(imagePaths[0]);
    }
  };

  return (
    <View>
      <ScrollView horizontal={true} style={styles.images}>
        {imagePaths &&
          imagePaths.map((imagePath, index) => (
            <Pressable key={index} onPress={() => handleImagePress(imagePath)}>
              <Image source={{ uri: imagePath }} style={styles.image} />
            </Pressable>
          ))}
      </ScrollView>

      <Modal visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContent}>
          <Pressable onPress={getNextImage}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default ImageScrollView;
