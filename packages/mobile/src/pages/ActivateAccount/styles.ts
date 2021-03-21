import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 42px;
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  text-align: center;
  margin: 16px 8%;
  font-size: 18px;
  line-height: 24px;
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

export const SendCodeText = styled.Text`
  color: #c1bccc;
`;

export const SendCodeButton = styled.TouchableOpacity``;

export const SendCodeButtonText = styled.Text`
  font-weight: 700;
`;
