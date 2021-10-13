import styled from 'styled-components/native';

const Container = styled.Pressable`
    flex-direction: row;
    margin: ${({ theme }) => `0 ${theme.spacings.smallest}`};
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
