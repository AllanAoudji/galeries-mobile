import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled(Animated.View)`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    overflow: hidden;
`;
const TitleContainer = styled(Animated.View)`
    align-items: center;
    bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${({ theme }) => theme.spacings.small};
    position: absolute;
    width: 100%;
    padding-bottom: 5px;
`;
const TypographyContainer = styled.View`
    max-width: 80%;
`;

export { Container, TitleContainer, TypographyContainer };
