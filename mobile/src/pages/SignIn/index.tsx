import React, {useState, useCallback} from 'react';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import SignInput from '../../components/SignInput';

import {
  containerStyle,
  Container,
  Title,
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

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        contentContainerStyle={containerStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Memenstagram</Title>

          <SignInput placeholder="E-mail" />

          <SignInput
            placeholder="Password"
            isPasswordInput
            passwordVisibility={passwordVisibility}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <Button onPress={() => {}}>
            <ButtonText>Log In</ButtonText>
          </Button>

          <Divider />

          <ForgotPasswordButton onPress={() => {}}>
            <ForgotPasswordButtonText>
              Forgot your password?
            </ForgotPasswordButtonText>
          </ForgotPasswordButton>

          <Footer>
            <SignUpText>Don't have an account? </SignUpText>

            <SignUpButton onPress={navigateToSignUp}>
              <SignUpButtonText>Sign up.</SignUpButtonText>
            </SignUpButton>
          </Footer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
