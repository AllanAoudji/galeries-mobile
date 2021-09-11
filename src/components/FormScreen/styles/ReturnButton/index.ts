import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
    currentHeight?: number;
};

const ReturnButton = styled(Animated.View)<Props>`
    left: 0;
    padding-top: ${({ currentHeight }) => `${currentHeight || 0}px`};
    position: absolute;
    top: 0;
`;

export default ReturnButton;
