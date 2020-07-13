import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import {View} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import TabRoutes from './tab.routes';

// import Home from '../pages/Home';
// import FoodDetails from '../pages/FoodDetails';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator initialRouteName="MainBottom">
    {/* <App.Screen
      options={{
        cardStyle: {backgroundColor: '#C72828'},
        headerShown: false,
      }}
      name="Home"
      component={Home}
    /> */}
    <App.Screen
      name="MainBottom"
      component={TabRoutes}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
