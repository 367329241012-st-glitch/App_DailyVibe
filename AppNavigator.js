import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import QuoteScreen from '../screens/QuoteScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#8B9B74',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 8 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'add-circle-outline';
          else if (route.name === 'HistoryTab') iconName = 'calendar-outline';
          else if (route.name === 'QuoteTab') iconName = 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'บันทึกอารมณ์' }} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} options={{ tabBarLabel: 'ประวัติ' }} />
      <Tab.Screen name="QuoteTab" component={QuoteScreen} options={{ tabBarLabel: 'มุมพักใจ' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}