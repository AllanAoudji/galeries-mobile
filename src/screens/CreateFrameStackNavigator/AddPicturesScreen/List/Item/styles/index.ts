import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { DRAG_AND_DROP_UTILS } from '#helpers/constants';

const Container = styled(Animated.View)`
    height: ${() => `${DRAG_AND_DROP_UTILS.SIZE}px`};
    position: absolute;
    width: ${() => `${DRAG_AND_DROP_UTILS.SIZE}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
