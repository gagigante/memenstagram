import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import Icon from 'react-native-vector-icons/Feather';

import Activity from '../pages/Activity';

const App = createStackNavigator();

const ActivityStackRoutes: React.FC = () => (
  <App.Navigator initialRouteName="Activity">
    <App.Screen
      name="Activity"
      component={Activity}
      // options={{
      //   headerShown: false,
      //   gestureEnabled: false,
      // }}
    />
  </App.Navigator>
);

export default ActivityStackRoutes;
