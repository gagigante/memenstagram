import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const imageWidth = Dimensions.get('window').width / 3 - 2;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Nickname = styled.Text`
  margin: 12px;
  font-size: 20px;
  /* font-weight: bold; */
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 15px;
`;

export const Avatar = styled.Image`
  width: 86px;
  height: 86px;
  border-radius: 43px;
`;

export const ProfileInfo = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 8px;
  align-items: center;
`;

export const Info = styled.View`
  justify-content: center;
  align-items: center;
`;

export const InfoValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
`;

export const ProfileBio = styled.View`
  padding: 0 20px;
`;

export const ProfileName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const BioText = styled.Text`
  margin-top: 6px;
  font-size: 16px;
`;

export const EditProfileButton = styled.TouchableOpacity`
  margin: 20px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
`;

export const EditProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PostButton = styled.TouchableOpacity``;

export const Post = styled.Image`
  width: ${imageWidth}px;
  height: ${imageWidth}px;
  margin: 1px;
`;
