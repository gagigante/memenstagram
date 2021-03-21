import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  buttonTitle: string;
}

const Button: React.FC<ButtonProps> = ({ buttonTitle, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{buttonTitle}</ButtonText>
    </Container>
  );
};

export default Button;
