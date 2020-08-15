import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {View} from 'react-native';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Success from '../pages/Success';

// import { Container } from './styles';

const SignStack = createStackNavigator();

const SignRoutes: React.FC = () => {
  return (
    <SignStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn">
      <SignStack.Screen name="SignIn" component={SignIn} />
      <SignStack.Screen name="SignUp" component={SignUp} />
      <SignStack.Screen name="Success" component={Success} />
    </SignStack.Navigator>
  );
};

export default SignRoutes;
