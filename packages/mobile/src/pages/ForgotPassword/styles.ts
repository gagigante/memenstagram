import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

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

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 4%;
  left: 8%;
  z-index: 5;
`;
