import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

type ContainerProps = {
    color: keyof Style.Colors;
    paddingTop: number | undefined;
};

const Container = styled(Animated.View)<ContainerProps>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.HEADER_TAB_HEIGHT}px`};
    justify-content: space-between;
    padding: ${({ paddingTop, theme }) =>
        `${paddingTop || 0}px ${theme.spacings.small} 0 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
