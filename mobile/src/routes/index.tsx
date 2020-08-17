import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import SignRoutes from './sign.routes';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/auth';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Routes: React.FC = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <SignRoutes />;
};

export default Routes;
