import { RATE_LIMIT } from '../constants/constants';
import * as ImagePicker from 'expo-image-picker';

export const selectImages = async ({
  selectionLimit = RATE_LIMIT.IMAGES_PER_DREAM,
  images,
  setImages
}) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: true,
    selectionLimit:
      images?.length < selectionLimit ? selectionLimit - images?.length : 0
  });

  if (!result.canceled) {
    setImages((prevImages) => {
      let selectedImages = [...prevImages] || [];
      result.assets.forEach((asset) => {
        if (
          selectedImages.length < selectionLimit &&
          !selectedImages.includes(asset.uri) &&
          asset.uri?.length > 0
        ) {
          selectedImages.push(asset.uri);
        }
      });
      return selectedImages;
    });
  }
};

export const debounce = (callback, timeout) => {
  let timer;
  return {
    debouncedFn: (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    },
    clear: () => clearTimeout(timer)
  };
};
