import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import {IconWrapper, Avatar} from './styles/tab.styles';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Activity from '../pages/Activity';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#000',
      inactiveTintColor: '#B7B7CC',
      showLabel: false,
    }}>
    <Tab.Screen
      options={{
        tabBarIcon: ({color}) => <Icon size={25} name="home" color={color} />,
      }}
      name="Home"
      component={Home}
    />
    <Tab.Screen
      name="Search"
      options={{
        tabBarIcon: ({color}) => <Icon size={25} name="search" color={color} />,
      }}
      component={Search}
    />

    <Tab.Screen
      name="AddPost"
      options={{
        tabBarIcon: ({color}) => (
          <Icon size={25} name="plus-square" color={color} />
        ),
      }}
      component={Search}
    />

    <Tab.Screen
      name="Activity"
      options={{
        tabBarIcon: ({color}) => <Icon size={25} name="heart" color={color} />,
        title: 'Favoritos',
      }}
      component={Activity}
    />

    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({focused}) => (
          <IconWrapper focused={focused}>
            <Avatar
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
            />
          </IconWrapper>
        ),
      }}
      component={Profile}
    />
  </Tab.Navigator>
);

export default TabRoutes;
