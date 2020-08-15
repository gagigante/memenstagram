import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ActivityIndicator} from 'react-native';

import {Container} from './styles';

const ForgotPassword: React.FC = () => {
  const {reset} = useNavigation();

  const [countryCode, setCountryCode] = useState<CountryCode>('FR');
  const [country, setCountry] = useState<Country>(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
    false,
  );
  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  // useEffect(() => {
  //   reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: 'Success',
  //         params: {
  //           title: 'password successfully reseted',
  //           description:
  //             'Your password has been reseted and sended by SMS to your phone number. Check it out!',
  //           returnTo: 'SignIn',
  //           buttonText: 'Go to sign in',
  //         },
  //       },
  //     ],
  //   });
  // }, [reset]);

  return (
    <Container>
      <ActivityIndicator size={64} />
    </Container>
  );
};

export default ForgotPassword;
