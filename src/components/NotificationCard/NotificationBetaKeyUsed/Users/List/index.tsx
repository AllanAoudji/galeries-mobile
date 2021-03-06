import * as React from 'react';

import { Container } from './styles';

const List: React.FC<{}> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default List;
