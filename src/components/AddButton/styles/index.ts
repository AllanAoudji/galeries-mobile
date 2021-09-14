import styled from 'styled-components/native';

type Props = {
    color: keyof Style.Colors;
    right?: keyof Style.Spacings;
    bottom?: keyof Style.Spacings;
};

const size = 50;

const Container = styled.Pressable<Props>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    border-radius: ${() => `${size / 2}px`};
    bottom: ${({ bottom, theme }) =>
        bottom ? theme.spacings[bottom] : 'auto'};
    height: ${() => `${size}px`};
    justify-content: center;
    position: ${({ right, bottom }) =>
        !!right || !!bottom ? 'absolute' : 'relative'};
    right: ${({ right, theme }) => (right ? theme.spacings[right] : 'auto')};
    width: ${() => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
