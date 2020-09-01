import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../hooks/auth';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading: React.FC = () => {
  const {user} = useAuth();
  const {reset} = useNavigation();

  useEffect(() => {
    if (!user.confirmation_status) {
      return reset({
        index: 0,
        routes: [
          {
            name: 'ActivateAccount',
          },
        ],
      });
    }

    if (user.is_reseted) {
      return reset({
        index: 0,
        routes: [
          {
            name: 'RedefinePassword',
          },
        ],
      });
    }

    return reset({
      index: 0,
      routes: [
        {
          name: 'MainTabRoutes',
        },
      ],
    });
  }, [reset, user.is_reseted, user.confirmation_status]);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#999" />
    </View>
  );
};

export default Loading;
