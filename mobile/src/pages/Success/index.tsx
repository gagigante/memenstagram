import React from 'react';

import {
  Container,
  Image,
  Title,
  Description,
  Button,
  ButtonText,
} from './styles';

import SuccessImage from '../../assets/success.png';

const Success: React.FC = () => {
  return (
    <Container>
      <Image source={SuccessImage} resizeMode="cover" />

      <Title>Redefinição enviada!</Title>

      <Description>
        Boa, agora é só checar o e-mail que foi enviado para você redefinir sua
        senha e aproveitar os estudos.
      </Description>

      <Button>
        <ButtonText>Go to sign in</ButtonText>
      </Button>
    </Container>
  );
};

export default Success;
