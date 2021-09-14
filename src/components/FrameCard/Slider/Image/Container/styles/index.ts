import { LinearGradient } from 'expo-linear-gradient';
import styled, { css } from 'styled-components/native';

type ContainerProps = {
    height: number;
};
type ViewContainerProps = {
    color?: string;
};

const ContainerCss = css<ContainerProps>`
    height: ${({ height }) => `${height}px`};
    width: ${({ height }) => `${height}px`};
`;

const LinearGradiantContainer = styled(LinearGradient)`
    ${ContainerCss}
`;
const ViewContainer = styled.View<ViewContainerProps & ContainerProps>`
    ${ContainerCss}
    color: ${({ color, theme }) => color || theme.colors.primary};
`;

export { LinearGradiantContainer, ViewContainer };
