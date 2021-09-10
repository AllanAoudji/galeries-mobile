import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;

export default Container;
