import styled from 'styled-components/native';

const BodyContainer = styled.View`
    flex: 1;
`;
const Container = styled.View`
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
    align-items: center;
    padding: 4px 0 2px;
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
    flex-direction: row;
    opacity: 0.7;
    padding-top: 3px;
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
