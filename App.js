import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomePage } from './screens/WelcomePage';
import { SignUpPage } from './screens/SignUpPage';
import HomePage from './screens/HomePage';
import CommutePlanner from './screens/CommutePlanner';
import UserComponent from './screens/ProfilePage';
import Challenges from './screens/ChallengesPage';
import Leaderboard from './screens/Leaderboard';
import Achievements from './screens/Achievements';
import ChallengeDescription from './screens/ChallengeDescription';
import Congratulations from './screens/Congratulations';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage" screenOptions={{headerShown: false,}}>
        <Stack.Screen name='LoginPage' component={WelcomePage}/>
        <Stack.Screen name='SignupPage' component={SignUpPage}/>
        <Stack.Screen name='HomePage' component={HomePage}/>
        <Stack.Screen name='CommutePlannerPage' component={CommutePlanner}/>
        <Stack.Screen name='ProfilePage' component={UserComponent}/>
        <Stack.Screen name='Challenges' component={Challenges}/>
        <Stack.Screen name='Leaderboard' component={Leaderboard}/>
        <Stack.Screen name='Achievements' component={Achievements}/>
        <Stack.Screen name='ChallengeDescription' component={ChallengeDescription}/>
        <Stack.Screen name='Congratulations' component={Congratulations}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}