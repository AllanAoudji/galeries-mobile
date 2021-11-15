import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    margin: ${({ theme }) => `0 ${theme.spacings.smallest}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
