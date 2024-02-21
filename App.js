import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomePage } from './screens/WelcomePage';
import { SignUpPage } from './screens/SignUpPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{headerShown: false,}}>
        <Stack.Screen name='WelcomePage' component={WelcomePage}/>
        <Stack.Screen name='SignupPage' component={SignUpPage}/>
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
