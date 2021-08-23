import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
    color: keyof Style.Colors;
};

const Container = styled(Animated.View)<Props>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    flex: 1;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export default Container;
