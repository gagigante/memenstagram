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

export const Title = styled.Text`
  font-family: 'Billabong';
  text-align: center;
  font-size: 56px;
  margin-top: 72px;
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
