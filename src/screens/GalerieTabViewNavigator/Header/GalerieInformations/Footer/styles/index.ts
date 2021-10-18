import styled from 'styled-components/native';

const Container = styled.View`
    padding: ${({ theme }) =>
        `${theme.spacings.small} ${theme.spacings.small} 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
