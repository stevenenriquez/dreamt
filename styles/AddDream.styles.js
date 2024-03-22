import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: 20
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
    marginBottom: 10
  },
  date: {
    color: COLORS.white,
    opacity: 0.7,
    fontFamily: FONT.family,
    marginBottom: 10,
    marginLeft: 20
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.family
  },
  content: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 20,
    borderRadius: 30,
    height: 400,
    backgroundColor: COLORS.nearBlack,
    borderWidth: 2
    // borderColor: COLORS.gray
  },
  notes: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: FONT.family,
    padding: 20,
    borderRadius: 30,
    height: 200,
    backgroundColor: COLORS.nearBlack,
    marginBottom: 20,
    paddingBottom: 50
  },
  button: {
    marginRight: 5
  },
  headerButton: {
    marginRight: 10
  },
  disabledButton: {
    opacity: 0.3
  },
  buttonText: {
    fontFamily: FONT.family,
    fontSize: 15,
    color: COLORS.white
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 5
  },
  imageSelectionButtons: {
    flexDirection: 'row'
  },
  imageSelectButton: {
    padding: 7,
    width: '90%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noImagesContainer: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: COLORS.nearBlack,
    borderColor: COLORS.gray,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSelectText: {
    color: COLORS.white,
    fontFamily: FONT.family,
    fontSize: 15
  },
  noVideoContainer: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: 2
  },
  tagList: {
    marginTop: 5,
    marginBottom: 5
  },
  deleteImageButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    borderColor: COLORS.white,
    borderWidth: 1,
    zIndex: 1
  },
  deleteImageButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  clarityImageContainer: {
    flex: 1,
    zIndex: 9999,
  },
  clarityImage: {
    width: '100%',
    height: 150,
    borderRadius: 20
  },
  claritySlider: {
    margin: 5,
    width: '95%'
  }
});

export default styles;
