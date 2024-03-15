import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: COLORS.gray,
        tabBarStyle: {backgroundColor: COLORS.black, borderColor: COLORS.black},
        tabBarLabelStyle: {color: COLORS.white},
        tabBarActiveTintColor: COLORS.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title: "",
            tabBarIcon: ({ color }) => <Ionicons size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="wizard-hat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}