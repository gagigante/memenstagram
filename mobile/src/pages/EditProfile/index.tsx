import React, {useCallback, useRef, useState, useLayoutEffect} from 'react';
import {
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../hooks/auth';

import api from '../../services/api';

import SignInput from '../../components/SignInput';

import {
  stylesheet,
  Container,
  UserAvatarButton,
  UserAvatar,
  UserAvatarIconView,
  Divider,
  LinkButton,
  LinkButtonText,
} from './styles';

import AvatarPlaceholder from '../../assets/avatar-placeholder.png';

interface UpdateUserFormData {
  name: string;
  nickname: string;
  email: string;
  bio: string;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

const EditProfile: React.FC = () => {
  const {user, updateUser} = useAuth();
  const {navigate, setOptions, reset} = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const nicknameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const bioInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = useCallback(
    async (data: UpdateUserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          nickname: Yup.string().required(),
          email: Yup.string().email().required(),
          bio: Yup.string(),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val) => !!val.length,
            then: Yup.string().required(),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: Yup.string().required(),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined]),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        Keyboard.dismiss();

        if (!data.oldPassword) {
          delete data.oldPassword;
          delete data.password;
          delete data.passwordConfirmation;
        }

        delete data.passwordConfirmation;

        const response = await api.put('profile', data);

        updateUser(response.data);

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
            : 'An error occurred while updating profile',
        );
      }
    },
    [reset, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Choose a profile photo',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Use camera',
        chooseFromLibraryButtonTitle: 'Choose from gallery',
      },
      async (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Error while updating avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        setIsLoading(true);

        api.patch('users/avatar', data).then((apiResponse) => {
          updateUser(apiResponse.data);

          setIsLoading(false);
        });
      },
    );
  }, [updateUser, user.id]);

  const handleNavigateToEditPhoneNumber = useCallback(() => {
    navigate('EditPhoneNumber');
  }, [navigate]);

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
    <KeyboardAvoidingView
      style={stylesheet.KeyboardAvoidingViewStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        contentContainerStyle={stylesheet.scrollViewStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <UserAvatarButton onPress={handleUpdateAvatar}>
            <UserAvatar
              source={
                user.avatar_url ? {uri: user.avatar_url} : AvatarPlaceholder
              }
            />

            <UserAvatarIconView>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Icon name="camera" color="#fff" size={24} />
              )}
            </UserAvatarIconView>
          </UserAvatarButton>

          <Form initialData={user} ref={formRef} onSubmit={handleUpdateProfile}>
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
                bioInputRef.current?.focus();
              }}
            />

            <SignInput
              ref={bioInputRef}
              name="bio"
              placeholder="bio"
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordInputRef.current?.focus();
              }}
            />

            <Divider />

            <SignInput
              ref={oldPasswordInputRef}
              name="oldPassword"
              passwordInput
              placeholder="Current password"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <SignInput
              ref={passwordInputRef}
              name="password"
              passwordInput
              placeholder="New password"
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
          </Form>

          <LinkButton onPress={handleNavigateToEditPhoneNumber}>
            <LinkButtonText>Change phone number</LinkButtonText>
          </LinkButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
