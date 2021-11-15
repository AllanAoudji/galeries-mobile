import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    margin-left: ${({ theme }) => theme.spacings.smallest};
    margin-right: ${({ theme }) => theme.spacings.smallest};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
