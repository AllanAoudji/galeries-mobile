import styled from 'styled-components/native';

type Props = {
    color: keyof Style.Colors;
};

const SIZE = 40;

const LoaderContainer = styled.View<Props>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    border-radius: ${() => `${SIZE / 2}px`};
    height: ${() => `${SIZE}px`};
    justify-content: center;
    width: ${() => `${SIZE}px`};
`;

export default LoaderContainer;
