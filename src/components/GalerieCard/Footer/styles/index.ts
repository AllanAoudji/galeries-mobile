import styled from 'styled-components/native';

const Container = styled.View`
    height: 74px;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
