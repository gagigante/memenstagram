import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  position: relative;
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
