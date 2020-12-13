import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
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
  EmptyContainer,
  EmptyImage,
  EmptyText,
  LoadingContainer,
} from './styles';

import {ProfileStackParamList} from '../../routes/MainTabRoutes/ProfileStackRoutes';
import IPost from '../../models/IPost';
import IUser from '../../models/IUser';
import IUserStats from '../../models/IUserStats';

import AvatarPlaceholder from '../../assets/avatar-placeholder.png';
import NoPostsPlaceholder from '../../assets/no-posts-placeholder.png';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<ProfileStackParamList, 'Profile'>;

const Profile = ({route, navigation}: Props) => {
  const routeIndex = useNavigationState((state) => state.index);

  const {user, signOut} = useAuth();
  const {setOptions} = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileNickname, setProfileNickname] = useState('');
  const [userProfile, setUserProfile] = useState<IUser>();
  const [userStats, setUserStats] = useState<IUserStats>({} as IUserStats);
  const [userPosts, setUserPosts] = useState<IPost[]>([] as IPost[]);

  const loadData = useCallback(async () => {
    let response;

    response = await api.get(`profile/${profileNickname}`);
    setUserProfile(response.data);

    response = await api.get(`profile/${profileNickname}/stats`);
    setUserStats(response.data);

    response = await api.get(`posts/${profileNickname}`);
    setUserPosts(response.data);

    setIsLoading(false);
  }, [profileNickname]);

  useEffect(() => {
    setProfileNickname(user.nickname);

    if (route.params) {
      setProfileNickname(route.params.nickname);
    }

    if (profileNickname !== '') {
      loadData();
    }
  }, [loadData, route.params, user.nickname, profileNickname]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    let response;

    response = await api.get(`profile/${profileNickname}`);
    setUserProfile(response.data);

    response = await api.get(`profile/${profileNickname}/stats`);
    setUserStats(response.data);

    response = await api.get(`posts/${profileNickname}`);
    setUserPosts(response.data);

    setRefreshing(false);
  }, [profileNickname]);

  const handleNavigateToEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const handleNavigateToUserFollowsAndFollowers = useCallback(() => {
    navigation.push('UserFollowsAndFollowers', {nickname: profileNickname});
  }, [navigation, profileNickname]);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: userProfile?.nickname,
    });

    if (routeIndex === 0) {
      setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={signOut}>
            <Icon size={24} name="log-out" color="#000" />
          </TouchableOpacity>
        ),
      });
    }
  }, [setOptions, signOut, userProfile, routeIndex]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#999" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <ProfileContainer>
          <Avatar
            source={
              userProfile?.avatar_url
                ? {uri: userProfile?.avatar_url}
                : AvatarPlaceholder
            }
          />

          <ProfileInfo>
            <Info>
              <InfoValue>{userStats.posts}</InfoValue>
              <InfoLabel>Posts</InfoLabel>
            </Info>

            <TouchableOpacity onPress={handleNavigateToUserFollowsAndFollowers}>
              <Info>
                <InfoValue>{userStats.followers}</InfoValue>
                <InfoLabel>Followers</InfoLabel>
              </Info>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNavigateToUserFollowsAndFollowers}>
              <Info>
                <InfoValue>{userStats.following}</InfoValue>
                <InfoLabel>Following</InfoLabel>
              </Info>
            </TouchableOpacity>
          </ProfileInfo>
        </ProfileContainer>

        <ProfileBio>
          <ProfileName>{userProfile?.name}</ProfileName>
          <BioText>{userProfile?.bio}</BioText>
        </ProfileBio>

        {profileNickname === user.nickname && (
          <EditProfileButton onPress={handleNavigateToEditProfile}>
            <EditProfileButtonText>Edit Profile</EditProfileButtonText>
          </EditProfileButton>
        )}

        {userPosts.length >= 1 ? (
          <Grid>
            {userPosts.map((post: IPost) => (
              <PostButton
                key={post.id}
                onPress={() => navigation.push('UserPosts')}
                activeOpacity={0.8}>
                <Post
                  source={{
                    uri: post.postImages[0].image_url,
                  }}
                  resizeMode="cover"
                />
              </PostButton>
            ))}
          </Grid>
        ) : (
          <EmptyContainer>
            <EmptyImage source={NoPostsPlaceholder} resizeMode="contain" />
            <EmptyText>There's no posts yet</EmptyText>
          </EmptyContainer>
        )}
      </ScrollView>
    </Container>
  );
};

export default Profile;
