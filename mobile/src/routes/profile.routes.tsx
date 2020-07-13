import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import Icon from 'react-native-vector-icons/Feather';

import Profile from '../pages/Profile';

import PostStackRoutes from './post.routes';

const ProfileStack = createStackNavigator();

const ProfileStackRoutes: React.FC = () => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <ProfileStack.Screen
      name="PostStack"
      component={PostStackRoutes}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackRoutes;
