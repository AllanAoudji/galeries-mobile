import * as React from 'react';
import { ViewProps } from 'react-native';

import { Container } from './styles';

const FullScreenContainer: React.FC<ViewProps> = ({ children, ...props }) => {
    return <Container {...props}>{children}</Container>;
};

export default FullScreenContainer;
