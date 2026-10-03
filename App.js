import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { MoodProvider } from './context/MoodContext'; // <-- เพิ่มการอิมพอร์ต

export default function App() {
  return (
    <MoodProvider> {/* <-- หุ้มด้วย MoodProvider */}
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
    </MoodProvider>
  );
}