import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled(Animated.View)`
    height: ${() => `${GLOBAL_STYLE.GALERIE_MODAL_HEIGHT}px`};
`;

export default Container;
