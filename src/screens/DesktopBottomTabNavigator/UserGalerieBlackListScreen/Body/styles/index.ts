import styled from 'styled-components/native';

const BlackListedByContainer = styled.Pressable`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
    margin-bottom: ${({ theme }) => theme.spacings.smallest};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.smallest} ${theme.spacings.small}`};
`;
const Container = styled.View`
    margin-top: ${({ theme }) => theme.spacings.large};
`;
const TitleContainer = styled.View`
    padding-bottom: 10px;
`;

// eslint-disable-next-line import/prefer-default-export
export { BlackListedByContainer, Container, TitleContainer };
