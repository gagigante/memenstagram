import React, {useCallback, useRef} from 'react';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';

import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';

import getValidationErrors from '../../utils/getValidationErrors';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import SignInput from '../../components/SignInput';

import {
  stylesheet,
  Container,
  Title,
  Button,
  ButtonText,
  Divider,
  BackButton,
} from './styles';

interface SignUpFormData {
  name: string;
  nickname: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const nicknameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const {goBack, reset} = useNavigation();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleCreateAccount = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          nickname: Yup.string().required(),
          email: Yup.string().email().required(),
          phone_number: Yup.string()
            .required()
            .matches(/^\+?[1-9]\d{4,14}$/),
          password: Yup.string().required(),
          password_confirmation: Yup.string()
            .required()
            .oneOf([Yup.ref('password')]),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        delete data.password_confirmation;

        const response = await api.post('users', data);

        const newUser = response.data;

        reset({
          index: 0,
          routes: [
            {
              name: 'ActivateAccount',
              params: {
                user_id: newUser.id,
              },
            },
          ],
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // console.log(err.response.data.message);

        Alert.alert(
          'Error',
          err.response
            ? err.response.data.message
            : 'An error occurred while create account',
        );
      }
    },
    [reset],
  );

  return (
    <KeyboardAvoidingView
      style={stylesheet.KeyboardAvoidingViewStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <BackButton onPress={handleGoBack}>
        <Icon size={32} name="chevron-left" color="#C1BCCC" />
      </BackButton>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={stylesheet.scrollViewStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Memenstagram</Title>

          <Form ref={formRef} onSubmit={handleCreateAccount}>
            <SignInput
              name="name"
              placeholder="Name"
              autoCorrect={false}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => {
                nicknameInputRef.current?.focus();
              }}
            />

            <SignInput
              ref={nicknameInputRef}
              name="nickname"
              placeholder="Nickname"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <SignInput
              ref={emailInputRef}
              name="email"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                phoneInputRef.current?.focus();
              }}
            />

            <SignInput
              ref={phoneInputRef}
              name="phone_number"
              placeholder="Phone number"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Divider />

            <SignInput
              ref={passwordInputRef}
              name="password"
              passwordInput
              placeholder="Password"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current?.focus();
              }}
            />

            <SignInput
              ref={passwordConfirmationInputRef}
              name="password_confirmation"
              passwordInput
              placeholder="Password confirmation"
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              <ButtonText>Create account</ButtonText>
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
