import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import {Container, TextInput, EyeButton} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  passwordInput?: boolean;
  containerStyle?: object;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, passwordInput, containerStyle = {}, ...rest},
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isWrong={!!error}>
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        secureTextEntry={passwordInput && passwordVisibility ? true : false}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value: string) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />

      {passwordInput && (
        <EyeButton onPress={togglePasswordVisibility}>
          <Icon
            size={25}
            name={passwordVisibility ? 'eye' : 'eye-off'}
            color="#C1BCCC"
          />
        </EyeButton>
      )}
    </Container>
  );
};

export default forwardRef(Input);
