import React, {useState, useCallback, useRef} from 'react';

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
  NativeModulesStatic,
} from 'react-native';

import getValidationErrors from '../../utils/getValidationErrors';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';

import SignInput from '../../components/SignInput';

import {
  stylesheet,
  Container,
  UserAvatarButton,
  UserAvatar,
  UserAvatarIconView,
  Button,
  ButtonText,
  Divider,
  BackButton,
} from './styles';

import AvatarPlaceholder from '../../assets/avatar-placeholder.png';

interface SignUpFormData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
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

  const [userAvatar, setUserAvatar] = useState<
    {uri: string} | NativeModulesStatic
  >(AvatarPlaceholder);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma foto de perfil',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert(response.error);
          return;
        }

        setUserAvatar({uri: response.uri});

        // const data = new FormData();

        // data.append('avatar', {
        //   type: 'image/jpeg',
        //   name: `${user.id}.jpg`,
        //   uri: response.uri,
        // });

        // api.patch('users/avatar', data).then((apiResponse) => {
        //   updateUser(apiResponse.data);
        // });
      },
    );
  }, []);

  const handleCreateAccount = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          nickname: Yup.string().required(),
          email: Yup.string().email().required(),
          phone: Yup.string().required(),
          password: Yup.string().required(),
          password_confirmation: Yup.string()
            .required()
            .oneOf([Yup.ref('password')]),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // should create account and update avatar if exists

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
          'Authentication error',
          'An error occurred while logging in, check the credentials',
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
          <Form ref={formRef} onSubmit={handleCreateAccount}>
            <UserAvatarButton onPress={handleUpdateAvatar} activeOpacity={0.9}>
              <UserAvatar source={userAvatar} />

              <UserAvatarIconView>
                <Icon size={24} color="#fff" name="camera" />
              </UserAvatarIconView>
            </UserAvatarButton>

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
              name="phone"
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
