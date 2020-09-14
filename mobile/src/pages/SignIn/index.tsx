import React, {useCallback, useRef} from 'react';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';

import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';

import {useAuth} from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import SignInput from '../../components/SignInput';
import Button from '../../components/Button';

import {
  stylesheet,
  Container,
  Title,
  Divider,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  Footer,
  SignUpText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const {navigate} = useNavigation();

  const {signIn} = useAuth();

  const navigateToSignUp = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  const navigateToForgotPassword = useCallback(() => {
    navigate('ForgotPassword');
  }, [navigate]);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Authentication error',
          'An error occurred while logging in, check the credentials',
        );
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      style={stylesheet.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        contentContainerStyle={stylesheet.containerStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Memenstagram</Title>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <SignInput
              name="email"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <SignInput
              ref={passwordInputRef}
              name="password"
              passwordInput
              placeholder="Password"
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              buttonTitle="Log In"
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>

          <Divider />

          <ForgotPasswordButton onPress={navigateToForgotPassword}>
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
