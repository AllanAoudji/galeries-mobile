import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: center;
`;

export default Container;
