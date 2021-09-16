import styled from 'styled-components/native';

type ContainerProps = {
    bottom?: keyof Style.Spacings;
    color: keyof Style.Colors;
    right?: keyof Style.Spacings;
};

const CONTAINER_SIZE = 50;

const Container = styled.Pressable<ContainerProps>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    border-radius: ${() => `${CONTAINER_SIZE / 2}px`};
    bottom: ${({ bottom, theme }) =>
        bottom ? theme.spacings[bottom] : 'auto'};
    height: ${() => `${CONTAINER_SIZE}px`};
    justify-content: center;
    position: ${({ right, bottom }) =>
        !!right || !!bottom ? 'absolute' : 'relative'};
    right: ${({ right, theme }) => (right ? theme.spacings[right] : 'auto')};
    width: ${() => `${CONTAINER_SIZE}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
