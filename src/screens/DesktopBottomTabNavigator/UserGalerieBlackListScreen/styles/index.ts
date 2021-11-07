import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['primary-light']};
    flex: 1;
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
