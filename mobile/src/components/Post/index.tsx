import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {useAuth} from '../../hooks/auth';

import {
  Container,
  ContainerHeader,
  UserInfo,
  Username,
  UserImage,
  PostImage,
  ActionsContainer,
  ActionButton,
  LikesContainer,
  LikesAvatarContainer,
  Avatar,
  LikesText,
  BoldText,
} from './styles';

interface IPostsProps {
  userClickFunction(): void;
}

const Post = ({userClickFunction}: IPostsProps) => {
  const {user} = useAuth();

  const handleClickUser = useCallback(() => {
    userClickFunction();
  }, [userClickFunction]);

  return (
    <Container>
      <ContainerHeader>
        <UserInfo onPress={handleClickUser}>
          <UserImage source={{uri: user.avatar_url}} />

          <Username>gagigante</Username>
        </UserInfo>

        <TouchableOpacity>
          <IconFeather size={18} name="more-vertical" color="#000" />
        </TouchableOpacity>
      </ContainerHeader>

      <PostImage
        source={{
          uri:
            'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
        }}
      />

      <ActionsContainer>
        <ActionButton>
          <IconFontAwesome size={26} name="heart" color="#000" />
        </ActionButton>

        <ActionButton>
          <IconFeather size={26} name="heart" color="#000" />
        </ActionButton>

        <ActionButton>
          <IconFeather size={26} name="heart" color="#000" />
        </ActionButton>
      </ActionsContainer>

      <LikesContainer>
        <LikesAvatarContainer>
          <Avatar
            source={{
              uri:
                'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
            }}
          />

          <Avatar
            source={{
              uri:
                'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
            }}
          />

          <Avatar
            source={{
              uri:
                'https://avatars2.githubusercontent.com/u/48386738?s=460&u=3f9a149d5c9e6c854b0678f684a5b2c080ab6400&v=4',
            }}
          />
        </LikesAvatarContainer>

        <LikesText>Liked by</LikesText>
        <BoldText>{' \t'}gagigante</BoldText>
        <LikesText>
          {'\t'}and{'\t'}
        </LikesText>
        <BoldText>others</BoldText>
      </LikesContainer>
    </Container>
  );
};

export default Post;
