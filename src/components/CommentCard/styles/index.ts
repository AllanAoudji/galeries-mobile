import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    margin: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.small}`};
`;
const ContentContainer = styled.View`
    flex-direction: row;
`;
const ContentContainerFooter = styled.View`
    flex-direction: row;
    align-items: center;
`;
const ReplyContainer = styled.Pressable`
    padding: ${({ theme }) => `5px ${theme.spacings.smallest}`};
`;
const TimeContainer = styled.View`
    opacity: 0.8;
`;
const ViewContainer = styled.Pressable`
    padding-top: 5px;
`;

export {
    Container,
    ContentContainer,
    ContentContainerFooter,
    ReplyContainer,
    TimeContainer,
    ViewContainer,
};
