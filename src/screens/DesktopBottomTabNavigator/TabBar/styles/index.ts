import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled(Animated.View)`
    align-items: stretch;
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.BOTTOM_TAB_HEIGHT + 1}px`};
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 1;
`;
const IconContainer = styled.Pressable`
    align-items: center;
    flex: 1;
    justify-content: center;
`;
const PictogramContainer = styled.View`
    padding-bottom: 3px;
`;

export { Container, IconContainer, PictogramContainer };
