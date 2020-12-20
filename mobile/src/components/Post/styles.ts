import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const windowsWidth = Dimensions.get('window').width;

export const Container = styled.View`
  background-color: #fff;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const UserInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 34px;
  height: 34px;
  border-radius: 17px;
`;

export const Username = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-left: 12px;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: ${windowsWidth}px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  padding: 12px 6px 8px;
`;

export const ActionButton = styled.TouchableOpacity`
  margin: 0 0 0 8px;
`;

export const LikesContainer = styled.View`
  flex-direction: row;
  margin: 8px;
  align-items: center;
`;

export const LikesAvatarContainer = styled.View`
  flex-direction: row;
  padding: 0 6px 0 12px;
`;

export const Avatar = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid #fff;
  margin-left: -8px;
`;

export const LikesText = styled.Text``;

export const BoldText = styled.Text`
  font-weight: bold;
`;
