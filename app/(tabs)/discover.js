import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants/theme';
import { useState } from 'react';
import {
  resetDB,
  getTags,
  createTags,
  getDBTableDetails,
  getTableDetails
} from '../../utils/db';

export default function Tab() {
  const [response, setResponse] = useState('');
  const [tags, setTags] = useState('');
  const [tableName, setTableName] = useState('');
  const [toggleResponseFullScreen, setToggleResponseFullScreen] =
    useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View
        style={{
          backgroundColor: COLORS.black,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        <ScrollView
          style={{ padding: 10, width: '100%', height: 1000 }}
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: 50
          }}
        >
          <CoolButton
            titleText="Clear"
            onPressFn={() => {
              setResponse('');
            }}
            setResponse={setResponse}
          />
          <CoolButton
            titleText="Reset DB"
            onPressFn={() => resetDB()}
            setResponse={setResponse}
          />
          <CoolButton
            titleText="Get DB Details"
            onPressFn={() => getDBTableDetails()}
            setResponse={setResponse}
          />
          <CoolButton
            titleText="Get Tags"
            onPressFn={() => getTags()}
            setResponse={setResponse}
          />
          <CoolTextInput
            titleText="Add Tag"
            onPressFn={() => createTags(tags.split(','))}
            setResponse={setResponse}
            textValue={tags}
            onTextChange={setTags}
          />
          <CoolTextInput
            titleText="Get Table Details"
            onPressFn={() => getTableDetails(tableName)}
            setResponse={setResponse}
            textValue={tableName}
            onTextChange={setTableName}
          />
        </ScrollView>
        <ScrollView
          style={{
            margin: 10,
            padding: 20,
            backgroundColor: COLORS.gray,
            borderRadius: 10,
            width: '100%',
            height: toggleResponseFullScreen ? 3000 : 400
          }}
        >
          <Text
            onPress={() =>
              setToggleResponseFullScreen(!toggleResponseFullScreen)
            }
            style={{
              color: COLORS.textSecondary,
              fontSize: 20,
              paddingBottom: 30
            }}
          >
            {response}
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

const CoolButton = ({ titleText, onPressFn, setResponse }) => {
  const handlePress = async () => {
    const response = await onPressFn();
    console.log('handlePress Response: ' + JSON.stringify(response, null, 2));
    setResponse(JSON.stringify(response, null, 4) || '(empty)');
  };

  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity style={{ borderRadius: 30 }} onPress={handlePress}>
        <Text
          style={{
            color: COLORS.textSecondary,
            backgroundColor: 'purple',
            padding: 10,
            borderRadius: 10,
            textAlign: 'center'
          }}
        >
          {titleText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CoolTextInput = ({
  titleText,
  onPressFn,
  setResponse,
  textValue,
  onTextChange
}) => {
  return (
    <>
      <TextInput
        value={textValue}
        onChangeText={onTextChange}
        placeholder={"Enter '" + titleText + "' value here"}
        placeholderTextColor={COLORS.lightGray}
        style={{
          color: COLORS.textSecondary,
          backgroundColor: COLORS.gray,
          padding: 10,
          margin: 10,
          borderRadius: 10,
          textAlign: 'center'
        }}
      />
      <CoolButton
        titleText={titleText}
        onPressFn={onPressFn}
        setResponse={setResponse}
      />
    </>
  );
};
