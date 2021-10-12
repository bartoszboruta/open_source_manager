import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './AuthStack';

const RootNavigator = () => {
  const [isAuth] = useState(false);

  return <NavigationContainer>{isAuth ? <AuthStack /> : <MainStack />}</NavigationContainer>;
};

export default RootNavigator;
