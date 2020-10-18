import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import { AuthProvider, AuthContext } from './src/providers/AuthProvider';

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: "Home Page" }}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} options={{ title: "Sign In" }} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: "Sign Up" }} />
    </AuthStack.Navigator>
  );
}

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <HomeTab.Screen name="Home" component={HomeScreen} options={{ title: "Home Screen" }} />
      <HomeTab.Screen name="Notification" component={NotificationScreen} options={{ title: "Notification" }} />
    </HomeTab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (<NavigationContainer>
          {auth.isLoggedIn ? <HomeTabScreen /> : <AuthStackScreen />}
        </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;