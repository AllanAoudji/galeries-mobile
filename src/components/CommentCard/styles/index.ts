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
    margin: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest}`};
`;

export { BodyContainer, Container };
