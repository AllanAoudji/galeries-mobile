import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
`;

export default Container;
