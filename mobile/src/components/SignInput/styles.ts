import styled from 'styled-components/native';

export const Container = styled.View`
  height: 54px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 8%;
  padding: 0px 8px;
  background: #f7f7f7;
  border: 1px solid #e6e6f0;
  border-radius: 4px;
`;

export const Input = styled.TextInput`
  flex: 1;
`;

export const EyeButton = styled.TouchableOpacity`
  margin: auto 8px;
  justify-content: center;
  align-items: center;
`;
