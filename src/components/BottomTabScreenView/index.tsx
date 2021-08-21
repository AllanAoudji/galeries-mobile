import * as React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    padding-bottom: 62px;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;

const BottomTabScreenView: React.FC<{}> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default BottomTabScreenView;
