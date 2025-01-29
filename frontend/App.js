import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from './screens/GetStarted'; //Import GetStartedPage
import LogIn from './screens/LogIn'; //Import LogInPage
import Register from './screens/Register'; //Import RegisterPage
import Home from './screens/Home'; // Import HomePage
import Search from './screens/Search'; //Import SearchPage
import AddPost from './screens/AddPost'; //Import AddPost
import Profile from './screens/Profile'; //Import ProfilePage
import Messaging from './screens/Messaging'; //Import MessagingPage
import ChatPage from './screens/ChatPage'; // Import ChatPage
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} /> 
        <Stack.Screen name ="AddPost" component={AddPost}options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/> 
        <Stack.Screen name="Messaging" component={Messaging} options={{ headerShown: false }}/> 
        <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}