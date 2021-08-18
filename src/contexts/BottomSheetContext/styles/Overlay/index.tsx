import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
    height: number;
};

const Overlay = styled(Animated.View)<Props>`
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    display: none;
    height: ${({ height }) => `${height}px`};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;

export default Overlay;
