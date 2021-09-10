import * as React from 'react';

import { Container } from './styles';

const TextInputContainer: React.FC<{}> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default TextInputContainer;
