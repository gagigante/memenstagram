import React, {useCallback, useRef} from 'react';

import {useRoute, useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';

import {Alert} from 'react-native';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import {useAuth} from '../../hooks/auth';

import SignInput from '../../components/SignInput';
import Button from '../../components/Button';

import {
  Container,
  Title,
  Description,
  Footer,
  SendCodeText,
  SendCodeButton,
  SendCodeButtonText,
} from './styles';

interface VerifyAccountData {
  confirmation_code: string;
}

interface RouteParams {
  user_id: string;
}

const ActivateAccount: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {reset} = useNavigation();
  const {params} = useRoute();

  const {user, updateUser} = useAuth();

  const routeParams = params as RouteParams;

  const resentActivationCode = useCallback(async () => {
    await api.get(
      `activate/code/${routeParams ? routeParams.user_id : user.id}`,
    );

    Alert.alert('Success', 'The code has been sended to your phone number');
  }, [user, routeParams]);

  const handleActivateAccount = useCallback(
    async (data: VerifyAccountData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          confirmation_code: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.patch(
          `activate/${routeParams ? routeParams.user_id : user.id}`,
          {
            ...data,
          },
        );

        if (user) {
          await updateUser({...user, confirmation_status: true});

          reset({
            index: 0,
            routes: [
              {
                name: 'LoadingPage',
              },
            ],
          });

          return;
        }

        reset({
          index: 0,
          routes: [
            {
              name: 'Success',
              params: {
                title: 'Account successfully created',
                description: 'Now you can login with your credentials',
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
          'Error while activate',
          'An error occurred while activate account, verify your code and try again',
        );
      }
    },
    [reset, routeParams, user, updateUser],
  );

  return (
    <Container>
      <Title>Activate your account!</Title>

      <Description>
        A code was sended by SMS to your phone number. Fill the input with the
        code to activate your account.
      </Description>

      <Form ref={formRef} onSubmit={handleActivateAccount}>
        <SignInput
          name="confirmation_code"
          maxLength={6}
          placeholder="Confirmation code"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />

        <Button
          buttonTitle="Verify account"
          onPress={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>

      <Footer>
        <SendCodeText>Didn't receive the code? </SendCodeText>

        <SendCodeButton onPress={resentActivationCode}>
          <SendCodeButtonText>Resend.</SendCodeButtonText>
        </SendCodeButton>
      </Footer>
    </Container>
  );
};

export default ActivateAccount;
