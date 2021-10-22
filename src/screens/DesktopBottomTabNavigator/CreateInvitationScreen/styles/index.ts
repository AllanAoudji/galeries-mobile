import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
