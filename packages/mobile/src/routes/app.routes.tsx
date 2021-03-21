import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';

import Loading from '../pages/Loading';
import ActivateAccount from '../pages/ActivateAccount';
import RedefinePassword from '../pages/RedefinePassword';
import EditProfile from '../pages/EditProfile';
import EditPhoneNumber from '../pages/EditPhoneNumber';

import MainTabRoutes from './MainTabRoutes';

const Root = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Root.Navigator
      initialRouteName="LoadingPage"
      mode="modal"
      screenOptions={{headerShown: false}}>
      <Root.Screen name="LoadingPage" component={Loading} />

      <Root.Screen name="ActivateAccount" component={ActivateAccount} />

      <Root.Screen name="RedefinePassword" component={RedefinePassword} />

      <Root.Screen name="MainTabRoutes" component={MainTabRoutes} />

      <Root.Screen
        name="EditProfile"
        component={EditProfile}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => (
            <Icon
              name="x"
              size={24}
              color="#363636"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Edit Profile',
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />

      <Root.Screen
        name="EditPhoneNumber"
        component={EditPhoneNumber}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => (
            <Icon
              name="x"
              size={24}
              color="#363636"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Edit Phone',
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
    </Root.Navigator>
  );
};

export default AppRoutes;
