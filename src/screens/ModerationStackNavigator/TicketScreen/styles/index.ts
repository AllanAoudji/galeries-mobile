import styled from 'styled-components/native';

const BodyContainer = styled.View`
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 10px;
    background-color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacings.normal};
    padding: ${({ theme }) =>
        `${theme.spacings.small} ${theme.spacings.smallest}`};
`;
const Container = styled.View`
    flex: 1;
    justify-content: center;
    margin: ${({ theme }) => theme.spacings.small};
`;
const PostedByContainer = styled.View`
    border-left-color: ${({ theme }) => theme.colors.secondary};
    border-left-width: 4px;
    border-right-color: ${({ theme }) => theme.colors.secondary};
    border-right-width: 4px;
    border-top-color: ${({ theme }) => theme.colors.secondary};
    border-top-left-radius: 10px;
    border-top-right-radius: 20px;
    border-top-width: 4px;
    padding: ${({ theme }) => theme.spacings.smallest};
`;
const UserContainer = styled.View`
    align-items: center;
    flex-direction: row;
    padding-top: 7px;
`;

export { BodyContainer, Container, PostedByContainer, UserContainer };
