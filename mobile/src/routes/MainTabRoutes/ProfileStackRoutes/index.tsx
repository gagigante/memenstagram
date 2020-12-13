import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../../../pages/Profile';
import UserPosts from '../../../pages/UserPosts';
import UserFollowsAndFollowers from '../../../pages/UserFollowsAndFollowers';

export type ProfileStackParamList = {
  Profile: {nickname: string} | undefined;
  UserPosts: undefined;
  UserFollowsAndFollowers: {nickname: string};
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

      <ProfileStack.Screen
        name="UserFollowsAndFollowers"
        component={UserFollowsAndFollowers}
        options={({route}) => ({
          headerTitle: route.params.nickname,
          headerStyle: {
            elevation: 0,
          },
        })}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackRoutes;
