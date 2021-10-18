import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled(Animated.View)`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    overflow: hidden;
`;
const EditPictogramContainer = styled.View`
    padding-left: ${({ theme }) => theme.spacings.smallest};
`;
const TitleContainer = styled(Animated.View)`
    align-items: center;
    bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest}`};
    position: absolute;
    width: 100%;
`;
const TypographyContainer = styled.View`
    max-width: 80%;
`;

// eslint-disable-next-line import/prefer-default-export
export {
    Container,
    EditPictogramContainer,
    TitleContainer,
    TypographyContainer,
};
