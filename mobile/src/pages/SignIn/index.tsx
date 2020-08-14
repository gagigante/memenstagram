import React, {useState, useCallback} from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {TouchableOpacity, Text} from 'react-native';

import {
  Container,
  ImageView,
  Title,
  InputView,
  Input,
  EyeButton,
  Button,
  ButtonText,
  Divider,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  Footer,
  SignUpText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  return (
    <Container>
      {/* <ImageView>
        <Image
          resizeMode="contain"
          source={logoImg}
          style={{paddingHorizontal: 20, width: 280}}
        />
      </ImageView> */}
      <Title>Memenstagram</Title>

      <InputView>
        <Input placeholder="E-mail" />
      </InputView>

      <InputView>
        <Input secureTextEntry={passwordVisibility} placeholder="Password" />

        <EyeButton onPress={togglePasswordVisibility}>
          <Icon
            size={25}
            name={passwordVisibility ? 'eye' : 'eye-off'}
            color="#C1BCCC"
          />
        </EyeButton>
      </InputView>

      <Button onPress={() => {}}>
        <ButtonText>Log In</ButtonText>
      </Button>

      <Divider />

      <ForgotPasswordButton>
        <ForgotPasswordButtonText>
          Forgot your password?
        </ForgotPasswordButtonText>
      </ForgotPasswordButton>

      <Footer>
        <SignUpText>Don't have an account? </SignUpText>

        <SignUpButton>
          <SignUpButtonText>Sign up.</SignUpButtonText>
        </SignUpButton>
      </Footer>
    </Container>
  );
};

export default SignIn;
