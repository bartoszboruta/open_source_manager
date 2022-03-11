import React from 'react';
import { Icon } from "react-native-elements";

const BackArrow = ({ navigation }: any) => {
  return (
    <Icon
      iconStyle={{ marginLeft: 8 }}
      name="arrow-back-ios"
      onPress={() => navigation.goBack()}
    />
  );
};

export default BackArrow;
