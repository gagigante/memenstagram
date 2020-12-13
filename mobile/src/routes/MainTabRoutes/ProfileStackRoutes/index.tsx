import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../../../pages/Profile';
import UserPosts from '../../../pages/UserPosts';

// import PostStackRoutes from '../post.routes';
export type ProfileStackParamList = {
  Profile: {nickname: string};
  UserPosts: undefined;
  EditProfile: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackRoutes: React.FC = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{gestureEnabled: false}}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerStyle: {
            elevation: 0,
            backgroundColor: 'transparent',
          },
          headerRightContainerStyle: {
            marginRight: 12,
          },
        }}
      />

      <ProfileStack.Screen
        name="UserPosts"
        component={UserPosts}
        options={{
          headerTitle: 'Posts',
        }}
      />

      {/* <ProfileStack.Screen
        name="PostStack"
        component={PostStackRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      /> */}
    </ProfileStack.Navigator>
  );
};

export default ProfileStackRoutes;
