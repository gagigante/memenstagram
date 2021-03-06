import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

export const stylesheet = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

export const Divider = styled.View`
  background-color: #e6e6f0;
  margin: 12px 8%;
  height: 1px;
`;
