import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type InnerContainerProp = {
    height: number;
};
type StyledAnimatedScrollViewProp = {
    paddingTop: number;
};

const AnimatedScrollView = Animated.createAnimatedComponent<any>(ScrollView);

const InnerContainer = styled.View<InnerContainerProp>`
    height: ${({ height }) => `${height}px`};
`;
const StyledAnimatedScrollView = styled(
    AnimatedScrollView
)<StyledAnimatedScrollViewProp>`
    flex: 1;
    padding-top: ${({ paddingTop }) => `${paddingTop}px`};
`;

export { InnerContainer, StyledAnimatedScrollView };
