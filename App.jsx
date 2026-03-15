import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Unbounded_700Bold } from '@expo-google-fonts/unbounded';

import HomeScreen from './src/screens/Homescreen';
import NewsScreen from './src/screens/NewsScreen';
import NewsDetailScreen from './src/screens/NewsDetailScreen';
import { RetroLoader } from './src/components/ui/RetroLoader';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Unbounded_700Bold,
  });

  if (!fontsLoaded) {
    return <RetroLoader label="Booting interface..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'Unbounded_700Bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="News"
          component={NewsScreen}
          options={{ title: 'News' }}
        />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          options={{ title: 'News Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}