import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 8%;
`;

export const Image = styled.Image`
  width: 128px;
  height: 128px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 16px;
  margin: 0 auto;
  margin-bottom: 48px;
  text-align: center;
  line-height: 24px;
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
