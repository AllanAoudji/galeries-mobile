import styled from 'styled-components/native';

const Container = styled.Pressable`
    flex-direction: row;
    padding-right: ${({ theme }) => theme.spacings.smallest};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
