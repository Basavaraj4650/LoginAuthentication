import React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Onboarding, Login } from './src/screens'
import Home from './src/screens/Home';
import AuthenticationScreen from './src/screens/AuthenticationScreen';
import InputOTPScreen from './src/screens/InputOTPScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
        <Stack.Screen name="InputOTPScreen" component={InputOTPScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App