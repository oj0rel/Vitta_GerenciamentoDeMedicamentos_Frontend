import { Colors } from "@/src/constants/Colors";
import { useSession } from "@/src/contexts/authContext";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withLayoutContext } from "expo-router";
import { useColorScheme } from "react-native";
import { styles } from "./styles";

export const Tabs = withLayoutContext(
  createBottomTabNavigator().Navigator
);

export default function TabsRootLayout() {
  const { isLoading } = useSession();
  const colorScheme = useColorScheme();

  if(isLoading) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1CBDCF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: [
          styles.bottomTab,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].background
          }
        ],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="medicamentos"
        options={{
          title: 'Medicamento',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Ionicons
              name={focused ? 'medkit' : 'medkit-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  )
}