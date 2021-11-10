import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
