import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

// import { Container } from './styles';

const UserPosts = ({navigation}: {navigation: any}) => {
  function goToProfile(nickname: string) {
    navigation.push('Profile', {nickname});
  }

  return (
    <View>
      <TouchableOpacity onPress={() => goToProfile('gagigante')}>
        <Text>push to profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPosts;
