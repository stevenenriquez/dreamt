import { RATE_LIMIT } from '../constants/constants';
import * as ImagePicker from 'expo-image-picker';

export const selectImages = async ({
  selectionLimit = RATE_LIMIT.IMAGES_PER_DREAM,
  images,
  handleImageSet
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
    let selectedImages = [...images] || [];
    result.assets.forEach((asset) => {
      if (
        selectedImages.length < selectionLimit &&
        !selectedImages.includes(asset.uri) &&
        asset.uri?.length > 0
      ) {
        selectedImages.push(asset.uri);
      }
    });
    handleImageSet(selectedImages);
    }
  }

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
