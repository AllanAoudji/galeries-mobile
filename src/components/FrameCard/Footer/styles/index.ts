import styled from 'styled-components/native';

const ActionNavigationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const CommentsButtonContainer = styled.Pressable`
    flex-direction: row;
    padding-right: ${({ theme }) => theme.spacings.smallest};
`;
const Container = styled.View`
    padding: ${({ theme }) => `5px ${theme.spacings.smallest} 0`};
`;
const DescriptionContainer = styled.Pressable`
    flex-direction: row;
    margin: ${({ theme }) => `0 ${theme.spacings.smallest}`};
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;
const LikesButtonContainer = styled.View`
    flex-direction: row;
`;

export {
    ActionNavigationContainer,
    CommentsButtonContainer,
    Container,
    DescriptionContainer,
    LikesButtonContainer,
};
