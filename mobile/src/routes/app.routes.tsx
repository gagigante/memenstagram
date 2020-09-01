import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';

import Loading from '../pages/Loading';
import ActivateAccount from '../pages/ActivateAccount';
import RedefinePassword from '../pages/RedefinePassword';

import MainTabRoutes from './mainTab.routes';
// import Home from '../pages/Home';
import EditProfile from '../pages/EditProfile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator initialRouteName="LoadingPage">
      <App.Screen
        name="LoadingPage"
        component={Loading}
        options={{headerShown: false}}
      />

      <App.Screen
        name="ActivateAccount"
        component={ActivateAccount}
        options={{headerShown: false}}
      />

      <App.Screen
        name="RedefinePassword"
        component={RedefinePassword}
        options={{headerShown: false}}
      />

      <App.Screen
        name="MainTabRoutes"
        component={MainTabRoutes}
        options={{headerShown: false}}
      />

      <App.Screen
        name="EditProfile"
        component={EditProfile}
        options={({navigation}) => ({
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
          headerRight: () => (
            <Icon
              name="check"
              size={24}
              color="#4287f5"
              onPress={() => console.log('entrou')}
            />
          ),
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Edit Profile',
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
