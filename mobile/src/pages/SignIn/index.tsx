import React from 'react';
import {Image} from 'react-native';

import {Container, ImageView, Button, ButtonText} from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <ImageView>
        <Image
          resizeMode="contain"
          source={logoImg}
          style={{paddingHorizontal: 20, width: 280}}
        />
      </ImageView>
      <Button onPress={() => {}}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
};

export default SignIn;
