import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useAuth} from '../../hooks/auth';

// import { Container } from './styles';

const EditProfile: React.FC = () => {
  const {signOut} = useAuth();

  // const handleUpdateAvatar = useCallback(() => {
  //   ImagePicker.showImagePicker(
  //     {
  //       title: 'Selecione uma foto de perfil',
  //       cancelButtonTitle: 'Cancelar',
  //       takePhotoButtonTitle: 'Usar câmera',
  //       chooseFromLibraryButtonTitle: 'Escolher da galeria',
  //     },
  //     (response) => {
  //       if (response.didCancel) {
  //         return;
  //       }

  //       if (response.error) {
  //         Alert.alert(response.error);
  //         return;
  //       }

  //       setUserAvatar({
  //         type: 'image/jpeg',
  //         uri: response.uri,
  //       });
  //     },
  //   );
  // }, []);

  return (
    <View>
      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;
