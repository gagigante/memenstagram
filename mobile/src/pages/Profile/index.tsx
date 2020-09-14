import React, {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity, Text, RefreshControl, ScrollView} from 'react-native';

import {useAuth} from '../../hooks/auth';

import {
  Container,
  Nickname,
  ProfileContainer,
  Avatar,
  ProfileInfo,
  Info,
  InfoValue,
  InfoLabel,
  ProfileBio,
  ProfileName,
  BioText,
  EditProfileButton,
  EditProfileButtonText,
  Grid,
  PostButton,
  Post,
} from './styles';

const Profile: React.FC = () => {
  const {signOut} = useAuth();

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleNavigateToEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Nickname>gagigante</Nickname>

        <ProfileContainer>
          <Avatar
            source={{
              uri:
                'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
            }}
          />

          <ProfileInfo>
            <Info>
              <InfoValue>000</InfoValue>
              <InfoLabel>Posts</InfoLabel>
            </Info>

            <Info>
              <InfoValue>000</InfoValue>
              <InfoLabel>Followers</InfoLabel>
            </Info>

            <Info>
              <InfoValue>000</InfoValue>
              <InfoLabel>Following</InfoLabel>
            </Info>
          </ProfileInfo>
        </ProfileContainer>

        <ProfileBio>
          <ProfileName>Gabriel Henrique G. da Silva</ProfileName>
          <BioText>Análise e desenvolvimento de sistemas - IFSP</BioText>
        </ProfileBio>

        <EditProfileButton onPress={handleNavigateToEditProfile}>
          <EditProfileButtonText>Edit Profile</EditProfileButtonText>
        </EditProfileButton>

        <TouchableOpacity onPress={signOut}>
          <Text>Sair</Text>
        </TouchableOpacity>

        <Grid>
          <PostButton
            onPress={() => navigation.navigate('PostStack', {screen: 'Post'})}
            activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
          <PostButton activeOpacity={0.8}>
            <Post
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
              }}
              resizeMode="contain"
            />
          </PostButton>
        </Grid>
      </ScrollView>
    </Container>
  );
};

export default Profile;
