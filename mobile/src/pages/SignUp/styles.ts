import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const stylesheet = StyleSheet.create({
  KeyboardAvoidingViewStyle: {
    position: 'relative',
    flex: 1,
  },

  scrollViewStyle: {
    paddingVertical: 16,
    position: 'relative',
  },
});

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  position: relative;
  width: 186px;
  height: 186px;
  margin-top: 42px;
  margin-bottom: 32px;
  align-self: center;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const UserAvatarIconView = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: #333333;
  right: 4%;
  bottom: 4%;
  z-index: 5;
`;

export const Button = styled(RectButton)`
  height: 54px;
  justify-content: center;
  align-items: center;
  margin: 8px 8%;
  padding: 16px 8px;
  border-radius: 4px;
  background-color: #4287f5;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const Divider = styled.View`
  background-color: #e6e6f0;
  margin: 12px 8%;
  height: 1px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 4%;
  left: 8%;
  z-index: 5;
`;
