import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
    width: number;
};

const Container = styled(Animated.View)<Props>`
    align-items: center;
    flex: 1;
    position: absolute;
    width: ${({ width }) => `${width}px`};
`;

export default Container;
