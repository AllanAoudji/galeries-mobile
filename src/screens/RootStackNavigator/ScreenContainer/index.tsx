import * as React from 'react';
import { Keyboard } from 'react-native';

import { Container } from './styles';

const ScreenContainer: React.FC<{}> = ({ children }) => {
    return <Container onPress={Keyboard.dismiss}>{children}</Container>;
};

export default ScreenContainer;
