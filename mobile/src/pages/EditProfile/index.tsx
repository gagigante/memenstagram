import React, {useCallback, useRef} from 'react';
import {
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

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
} from './styles';

// import AvatarPlaceholder from '../../assets/avatar-placeholder.png';

const EditProfile: React.FC = () => {
  const {user, signOut, updateUser} = useAuth();
  const {navigate} = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const nicknameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma foto de perfil',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      async (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });
        console.log('esse é o data: ' + data);
        const res = await api.patch('/users/avatar', data);

        updateUser(res.data);
      },
    );
  }, [updateUser, user.id]);

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
            <UserAvatar source={{uri: user.avatar_url}} />

            <UserAvatarIconView>
              <Icon name="camera" color="#fff" size={24} />
            </UserAvatarIconView>
          </UserAvatarButton>

          <Form ref={formRef} onSubmit={() => console.log('Entrou')}>
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
          </Form>

          <TouchableOpacity onPress={signOut}>
            <Text>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('LoadingPage')}>
            <Text>navigate</Text>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
