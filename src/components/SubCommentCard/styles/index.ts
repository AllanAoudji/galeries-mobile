import styled from 'styled-components/native';

type ContainerProps = {
    current: boolean;
};

const BodyContainer = styled.View`
    flex: 1;
`;
const Container = styled.Pressable<ContainerProps>`
    background-color: ${({ current, theme }) =>
        current ? theme.colors.secondary : 'transparent'};
    flex-direction: row;
    padding: 5px 30px 8px 79px;
`;
const ContentContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;
const TimeContainer = styled.View`
    opacity: 0.8;
    padding-top: 4px;
`;

export { BodyContainer, Container, ContentContainer, TimeContainer };
