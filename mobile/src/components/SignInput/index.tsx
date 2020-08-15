import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {TextInputProps} from 'react-native';

import {Container, Input, EyeButton} from './styles';

interface Props extends TextInputProps {
  isPasswordInput?: boolean;
  passwordVisibility?: boolean;
  togglePasswordVisibility?: () => void;
}

const SignInput: React.FC<Props> = ({
  isPasswordInput,
  passwordVisibility,
  togglePasswordVisibility,
  ...rest
}) => {
  return (
    <Container>
      {isPasswordInput ? (
        <Input secureTextEntry={!passwordVisibility} {...rest} />
      ) : (
        <Input {...rest} />
      )}

      {isPasswordInput && (
        <EyeButton onPress={togglePasswordVisibility}>
          <Icon
            size={25}
            name={!passwordVisibility ? 'eye' : 'eye-off'}
            color="#C1BCCC"
          />
        </EyeButton>
      )}
    </Container>
  );
};

export default SignInput;
