import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);

const StyledAnimatedFlatList = styled(AnimatedFlatList)`
    margin-top: ${() => `${GLOBAL_STYLE.SEARCH_BAR_HEIGHT}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { StyledAnimatedFlatList };
