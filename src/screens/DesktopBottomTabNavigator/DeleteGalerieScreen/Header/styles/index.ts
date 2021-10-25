import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    overflow: hidden;
`;
const LinearGradientStyle = styled(LinearGradient)`
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;

export { Container, LinearGradientStyle };
