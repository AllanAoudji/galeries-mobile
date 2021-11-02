import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';

type InnerContainerProps = {
    height: number;
};

const AnimatedScrollView = Animated.createAnimatedComponent<any>(ScrollView);

const InnerContainer = styled.View<InnerContainerProps>`
    height: ${({ height }) => `${height}px`};
`;
const StyledAnimatedScrollView = styled(AnimatedScrollView)`
    flex: 1;
`;

export { InnerContainer, StyledAnimatedScrollView };
