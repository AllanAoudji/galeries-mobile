import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 5px;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.smallest} ${theme.spacings.small}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
