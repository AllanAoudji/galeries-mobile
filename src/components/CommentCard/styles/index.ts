import styled from 'styled-components/native';

const BodyContainer = styled.View`
    flex: 1;
`;
const Container = styled.Pressable`
    flex-direction: row;
    margin: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest}`};
`;
const ContentContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;
const ContentContainerFooter = styled.Pressable`
    flex-direction: row;
    align-self: flex-start;
    align-items: center;
    padding: ${({ theme }) => ` 4px ${theme.spacings.smallest} 2px 0`};
`;
const ReplyContainer = styled.Pressable``;
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    height: 1px;
    margin-right: 11px;
    width: 24px;
`;
const TimeContainer = styled.View`
    opacity: 0.8;
    margin-right: ${({ theme }) => theme.spacings.smallest};
`;
const ViewContainer = styled.Pressable`
    align-items: center;
    align-self: flex-start;
    flex-direction: row;
    opacity: 0.7;
    padding: ${({ theme }) => `3px ${theme.spacings.smallest} 0 0`};
`;

export {
    BodyContainer,
    Container,
    ContentContainer,
    ContentContainerFooter,
    ReplyContainer,
    Separator,
    TimeContainer,
    ViewContainer,
};
