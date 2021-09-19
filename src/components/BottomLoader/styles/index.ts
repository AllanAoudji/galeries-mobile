import styled from 'styled-components/native';

type ContainerProps = {
    bottom?: keyof Style.Spacings;
    width: number;
};
type LoaderContainerProps = {
    color: keyof Style.Colors;
};

const LOADER_CONTAINER_SIZE = 40;

const Container = styled.View<ContainerProps>`
    align-items: center;
    bottom: ${({ bottom, theme }) =>
        bottom ? theme.spacings[bottom] : theme.spacings.small};
    flex: 1;
    position: absolute;
    width: ${({ width }) => `${width}px`};
`;
const LoaderContainer = styled.View<LoaderContainerProps>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    border-radius: ${() => `${LOADER_CONTAINER_SIZE / 2}px`};
    height: ${() => `${LOADER_CONTAINER_SIZE}px`};
    justify-content: center;
    width: ${() => `${LOADER_CONTAINER_SIZE}px`};
`;

export { Container, LoaderContainer };
