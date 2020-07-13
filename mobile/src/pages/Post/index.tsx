import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ViewMoreText from 'react-native-view-more-text';

import Icon from 'react-native-vector-icons/Feather';

import {Text, TouchableOpacity, ScrollView} from 'react-native';
import {
  Container,
  UserStrip,
  Avatar,
  Nickname,
  OptionsButton,
  PostContainer,
  PostImage,
} from './styles';

const Post: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserStrip>
          <Avatar
            source={{
              uri:
                'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
            }}
          />

          <Nickname>gagigante</Nickname>

          <OptionsButton>
            <Icon size={24} name="more-vertical" color="#000" />
          </OptionsButton>
        </UserStrip>

        <PostContainer>
          <PostImage
            source={{
              uri:
                'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
            }}
          />
        </PostContainer>

        <ViewMoreText numberOfLines={2}>
          <Text>
            Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri
            molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes
            malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam
            definitionem eos.
          </Text>
        </ViewMoreText>

        <Text>POST</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Likes')}>
          <Text>LIKES</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
          <Text>COMMENTS</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default Post;
