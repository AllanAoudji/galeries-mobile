import styled from 'styled-components/native';

type ContainerProps = {
    topLevel: boolean;
};

const Container = styled.View<ContainerProps>`
    flex-direction: row;
    margin: ${({ theme, topLevel }) =>
        `${topLevel ? '25px' : '10px'} ${theme.spacings.small} 0 0`};
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
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    height: 1px;
    margin-right: 8px;
    width: 26px;
`;
const TimeContainer = styled.View`
    opacity: 0.8;
`;
const ViewContainer = styled.Pressable`
    align-items: center;
    flex-direction: row;
    padding-top: 4px;
`;

export {
    Container,
    ContentContainer,
    ContentContainerFooter,
    ReplyContainer,
    Separator,
    TimeContainer,
    ViewContainer,
};
