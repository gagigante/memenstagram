import React, {useRef, useLayoutEffect, useCallback} from 'react';
import {TouchableOpacity, Alert} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/auth';

import api from '../../services/api';

import SignInput from '../../components/SignInput';

import {Container, Description} from './styles';

interface UpdatePhoneNumberData {
  phone_number: string;
}

const EditPhoneNumber: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {setOptions, reset} = useNavigation();

  const {updateUser, user} = useAuth();

  const handleUpdateUserPhoneNumber = useCallback(
    async (data: UpdatePhoneNumberData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          phone_number: Yup.string()
            .required()
            .matches(/^\+?[1-9]\d{4,14}$/),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.patch('users/phone', data);

        await api.get(`activate/code/${response.data.id}`);

        await updateUser(response.data);

        reset({
          index: 0,
          routes: [
            {
              name: 'LoadingPage',
            },
          ],
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err);

        Alert.alert(
          'Error',
          err.response
            ? err.response.data.message
            : 'An error occurred while updating phone number',
        );
      }
    },
    [reset, updateUser],
  );

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => formRef.current?.submitForm()}>
          <Icon name="check" size={24} color="#4287f5" />
        </TouchableOpacity>
      ),
    });
  }, [setOptions]);

  return (
    <Container>
      <Form
        initialData={{phone_number: user.phone_number}}
        ref={formRef}
        onSubmit={handleUpdateUserPhoneNumber}>
        <SignInput
          name="phone_number"
          placeholder="Phone number. Ex.: +5511912344567"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="phone-pad"
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>

      <Description>You will need to verify your phone number</Description>
    </Container>
  );
};

export default EditPhoneNumber;
