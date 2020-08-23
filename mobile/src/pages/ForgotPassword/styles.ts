import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const stylesheet = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

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

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 4%;
  left: 8%;
  z-index: 5;
`;
