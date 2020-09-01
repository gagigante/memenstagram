import React, {useRef, useCallback} from 'react';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';

import * as Yup from 'yup';

import api from '../../services/api';

import {useAuth} from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import SignInput from '../../components/SignInput';

import {
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  stylesheet,
  Container,
  Title,
  Button,
  ButtonText,
  Divider,
} from './styles';

interface RedefinePasswordFormData {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const RedefinePassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const {reset} = useNavigation();

  const {user, updateUser} = useAuth();

  const handleRedefinePassword = useCallback(
    async (data: RedefinePasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          oldPassword: Yup.string().required(),
          password: Yup.string().required(),
          passwordConfirmation: Yup.string()
            .required()
            .oneOf([Yup.ref('password')]),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.patch(`/password/redefine/${user.id}`, {
          oldPassword: data.oldPassword,
          password: data.password,
        });

        await updateUser(response.data);

        reset({
          index: 0,
          routes: [
            {
              name: 'MainTabRoutes',
            },
          ],
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Redefine password error',
          'An error occurred while redefine password, check the temporally password',
        );
      }
    },
    [updateUser, user, reset],
  );

  return (
    <KeyboardAvoidingView
      style={stylesheet.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={stylesheet.containerStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Redefine password</Title>

          <Form ref={formRef} onSubmit={handleRedefinePassword}>
            <SignInput
              name="oldPassword"
              passwordInput
              placeholder="Temporally password"
              autoCapitalize="none"
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
              name="passwordConfirmation"
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
              <ButtonText>Redefine password</ButtonText>
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RedefinePassword;
