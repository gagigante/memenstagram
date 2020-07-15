import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import Icon from 'react-native-vector-icons/Feather';

import Profile from '../pages/Profile';
import Post from '../pages/Post';
import Likes from '../pages/Likes';
import Comments from '../pages/Comments';

const PostStack = createStackNavigator();

const PostStackRoutes: React.FC = () => (
  <PostStack.Navigator initialRouteName="Post">
    <PostStack.Screen
      name="Post"
      component={Post}
      options={{
        title: 'Post',
        // headerShown: false,
        // gestureEnabled: false,
      }}
    />
    <PostStack.Screen
      name="Likes"
      component={Likes}
      // options={{
      //   headerShown: false,
      //   gestureEnabled: false,
      // }}
    />
    <PostStack.Screen
      name="Comments"
      component={Comments}
      // options={{
      //   headerShown: false,
      //   gestureEnabled: false,
      // }}
    />
    <PostStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  </PostStack.Navigator>
);

export default PostStackRoutes;
