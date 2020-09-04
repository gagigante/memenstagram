import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import {IconWrapper, Avatar} from './styles/tab.styles';

import {useAuth} from '../../hooks/auth';

// import Home from '../pages/Home';
// import Search from '../pages/Search';
// import Activity from '../pages/Activity';
// import Profile from '../pages/Profile';

// import ActivityStackRoutes from './activity.routes';
import ProfileStackRoutes from '../profile/profileStack.routes';

import AvatarPlaceholder from '../../assets/avatar-placeholder.png';

const Tab = createBottomTabNavigator();

const EmptyPage: React.FC = () => <View />;

const MainTabRoutes: React.FC = () => {
  const {user} = useAuth();

  return (
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
          tabBarIcon: ({color}) => (
            <Icon size={25} name="search" color={color} />
          ),
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
          tabBarIcon: ({color}) => (
            <Icon size={25} name="heart" color={color} />
          ),
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
                source={
                  user.avatar_url
                    ? {
                        uri: user.avatar_url,
                      }
                    : AvatarPlaceholder
                }
              />
            </IconWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabRoutes;
