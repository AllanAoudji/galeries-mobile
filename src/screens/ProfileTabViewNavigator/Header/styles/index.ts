import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

const Container = styled.View`
    height: ${() => `${GLOBAL_STYLE.PROFILE_TAB_BAR_INFOS}px`};
    padding-top: ${({ theme }) =>
        `${
            GLOBAL_STYLE.PROFILE_TAB_BAR_MENU +
            convertPixelToNum(theme.spacings.smallest)
        }px`};
`;
const InnerContainer = styled(Animated.View)`
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small}`};
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export { Container, InnerContainer };
