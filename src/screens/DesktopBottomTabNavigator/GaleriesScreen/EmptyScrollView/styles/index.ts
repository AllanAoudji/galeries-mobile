import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type InnerContainerProp = {
    height: number;
};

const AnimatedScrollView = Animated.createAnimatedComponent<any>(ScrollView);

const InnerContainer = styled.View<InnerContainerProp>`
    height: ${({ height }) => `${height}px`};
`;
const StyledAnimatedScrollView = styled(AnimatedScrollView)`
    flex: 1;
    margin-top: ${() => `${GLOBAL_STYLE.SEARCH_BAR_HEIGHT}px`};
`;

export { InnerContainer, StyledAnimatedScrollView };
