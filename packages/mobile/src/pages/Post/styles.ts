import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const imageWidth = Dimensions.get('window').width;

export const Container = styled.View`
  background-color: #fff;
`;

export const UserStrip = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 15px;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const Nickname = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  margin-right: auto;
`;

export const OptionsButton = styled.TouchableWithoutFeedback``;

export const PostContainer = styled.View``;

export const PostImage = styled.Image`
  width: ${imageWidth}px;
  height: ${imageWidth}px;
`;
