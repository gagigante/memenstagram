import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const containerStyle = {flex: 1};

export const Container = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Billabong';
  text-align: center;
  font-size: 56px;
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

export const ForgotPasswordButton = styled.TouchableOpacity``;

export const ForgotPasswordButtonText = styled.Text`
  font-weight: 700;
  text-align: center;
`;

export const Footer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
  border-top-width: 1px;
  border-color: #e6e6f0;
`;

export const SignUpText = styled.Text`
  color: #c1bccc;
`;

export const SignUpButton = styled.TouchableOpacity``;

export const SignUpButtonText = styled.Text`
  font-weight: 700;
`;
