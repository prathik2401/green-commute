import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomePage } from './screens/WelcomePage';
import { SignUpPage } from './screens/SignUpPage';
import HomePage from './screens/HomePage';
import CommutePlanner from './screens/CommutePlanner';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage" screenOptions={{headerShown: false,}}>
        <Stack.Screen name='LoginPage' component={WelcomePage}/>
        <Stack.Screen name='SignupPage' component={SignUpPage}/>
        <Stack.Screen name='HomePage' component={HomePage}/>
        <Stack.Screen name='CommutePlannerPage' component={CommutePlanner}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
