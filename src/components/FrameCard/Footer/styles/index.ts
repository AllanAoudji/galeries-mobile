import styled from 'styled-components/native';

const ActionNavigationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;
const ButtonContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;
const Container = styled.View`
    padding: ${({ theme }) => `5px ${theme.spacings.small} 0`};
`;
const DescriptionContainer = styled.Pressable`
    flex-direction: row;
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;

export {
    ActionNavigationContainer,
    ButtonContainer,
    Container,
    DescriptionContainer,
};
