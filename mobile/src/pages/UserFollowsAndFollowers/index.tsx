import React from 'react';
import {Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Container} from './styles';

const TabNavigator = createMaterialTopTabNavigator();

const Follows = () => {
  return <Text>Follows</Text>;
};

const Followers = () => {
  return <Text>Followers</Text>;
};

const UserFollowsAndFollowers = () => {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="Followers" component={Followers} />
      <TabNavigator.Screen name="Follows" component={Follows} />
    </TabNavigator.Navigator>
  );
};

export default UserFollowsAndFollowers;
