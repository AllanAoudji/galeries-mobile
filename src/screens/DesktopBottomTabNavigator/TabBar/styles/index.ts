import { LinearGradient } from 'expo-linear-gradient';
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
    bottom: 0;
`;
const IconContainer = styled.Pressable`
    align-items: center;
    flex: 1;
    justify-content: center;
`;
const LinearGradientStyle = styled(LinearGradient)`
    flex-direction: row;
    width: 100%;
`;
const PictogramContainer = styled.View`
    padding-bottom: 3px;
`;

export { Container, IconContainer, LinearGradientStyle, PictogramContainer };
