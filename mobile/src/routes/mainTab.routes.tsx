import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import {IconWrapper, Avatar} from './styles/tab.styles';

// import Home from '../pages/Home';
// import Search from '../pages/Search';
// import Activity from '../pages/Activity';
// import Profile from '../pages/Profile';

// import ActivityStackRoutes from './activity.routes';
import ProfileStackRoutes from './profile.routes';

const Tab = createBottomTabNavigator();

const EmptyPage: React.FC = () => <View />;

const MainTabRoutes: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#000',
      inactiveTintColor: '#B7B7CC',
      showLabel: false,
    }}>
    <Tab.Screen
      name="Home"
      component={EmptyPage}
      options={{
        tabBarIcon: ({color}) => <Icon size={25} name="home" color={color} />,
      }}
    />

    <Tab.Screen
      name="Search"
      component={EmptyPage}
      options={{
        tabBarIcon: ({color}) => <Icon size={25} name="search" color={color} />,
      }}
    />

    <Tab.Screen
      name="AddPost"
      component={EmptyPage}
      options={{
        tabBarIcon: ({color}) => (
          <Icon size={25} name="plus-square" color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="ActivityStackRoutes"
      component={EmptyPage}
      options={{
        tabBarIcon: ({color}) => <Icon size={25} name="heart" color={color} />,
        title: 'Activity',
      }}
    />

    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackRoutes}
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
    />
  </Tab.Navigator>
);

export default MainTabRoutes;
