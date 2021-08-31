import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
    height: number;
};

const Container = styled(Animated.View)<Props>`
    bottom: 0;
    height: ${({ height }) => `${height}px`};
    justify-content: flex-end;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 1;
`;

export default Container;
