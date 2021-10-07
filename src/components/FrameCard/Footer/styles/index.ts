import styled from 'styled-components/native';

const ActionNavigationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Container = styled.View`
    padding: ${({ theme }) => `5px ${theme.spacings.smallest} 0`};
`;
const DescriptionContainer = styled.Pressable`
    flex-direction: row;
    margin: ${({ theme }) => `0 ${theme.spacings.smallest}`};
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;

export { ActionNavigationContainer, Container, DescriptionContainer };
