import React, {useState, useCallback, ReactNode} from 'react';
import {KeyboardAvoidingView, ScrollView, Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import SignInput from '../../components/SignInput';

import {
  KeyboardAvoidingViewStyle,
  scrollViewStyle,
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

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const [userAvatar, setUserAvatar] = useState<{uri: string} | ReactNode>(
    AvatarPlaceholder,
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

  const handleSubmit = useCallback(() => {
    navigation.navigate('Success');
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={KeyboardAvoidingViewStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <BackButton onPress={handleGoBack}>
        <Icon size={32} name="chevron-left" color="#C1BCCC" />
      </BackButton>

      <ScrollView
        showsVerticalScReactNoderollIndicator={false}
        contentContainerStyle={scrollViewStyle}
        keyboardShouldPersistTaps="handled">
        <Container>
          <UserAvatarButton onPress={handleUpdateAvatar} activeOpacity={0.9}>
            <UserAvatar source={userAvatar} />

            <UserAvatarIconView>
              <Icon size={24} color="#fff" name="camera" />
            </UserAvatarIconView>
          </UserAvatarButton>

          <SignInput placeholder="Name" />

          <SignInput placeholder="Nickname" />

          <SignInput placeholder="E-mail" />

          <SignInput placeholder="Phone number" />

          <Divider />

          <SignInput placeholder="Password" isPasswordInput />

          <SignInput placeholder="Password confirmation" isPasswordInput />

          <Button onPress={handleSubmit}>
            <ButtonText>Create account</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
