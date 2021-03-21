import React, {useCallback, useRef} from 'react';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';

import api from '../../services/api';

import {Alert, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';

import getValidationErrors from '../../utils/getValidationErrors';

import Icon from 'react-native-vector-icons/Feather';

import SignInput from '../../components/SignInput';
import Button from '../../components/Button';

import {stylesheet, Container, Title, BackButton} from './styles';

interface ForgotPasswordFormData {
  phone: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {reset, goBack} = useNavigation();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleResetPassword = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          phone: Yup.string()
            .required()
            .matches(/^\+?[1-9]\d{4,14}$/),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`password/reset/${data.phone}`, {
          ...data,
        });

        reset({
          index: 0,
          routes: [
            {
              name: 'Success',
              params: {
                title: 'Password successfully reseted',
                description:
                  'Your password has been reseted and sended by SMS to your phone number.',
                returnTo: 'SignIn',
                buttonText: 'Go to sign in',
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

        Alert.alert(
          'Error while resetting password',
          'An error occurred while resetting password, verify your phone and try again',
        );
      }
    },
    [reset],
  );

  return (
    <KeyboardAvoidingView
      style={stylesheet.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <BackButton onPress={handleGoBack}>
        <Icon size={32} name="chevron-left" color="#C1BCCC" />
      </BackButton>

      <ScrollView
        contentContainerStyle={stylesheet.containerStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Memenstagram</Title>

          <Form ref={formRef} onSubmit={handleResetPassword}>
            <SignInput
              name="phone"
              placeholder="Phone number. Ex.: +5511912344567"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="phone-pad"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              buttonTitle="Reset password"
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
