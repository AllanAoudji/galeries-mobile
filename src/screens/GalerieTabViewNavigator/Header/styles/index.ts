import Animated from 'react-native-reanimated';
import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type DarkBackgroundProps = {
    currentHeight?: number;
};

const Container = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors.secondary};
    flex: 1;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;
// TODO: Should be a LinearGradiant
const CoverPictureContainer = styled.View`
    border-bottom-right-radius: 45px;
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    overflow: hidden;
`;
const DarkBackground = styled.View<DarkBackgroundProps>`
    background-color: rgba(0, 0, 0, 0.2);
    padding: ${({ currentHeight, theme }) =>
        `${currentHeight || 0}px ${theme.spacings.small} 6px`};
    justify-content: flex-end;
    flex: 1;
`;
const DescriptionContainer = styled.View`
    padding: ${({ theme }) =>
        `${theme.spacings.small} ${theme.spacings.small} 0`};
`;
const EditPictogramContainer = styled.View`
    padding-left: ${({ theme }) => theme.spacings.smallest};
`;
const TabbarContainer = styled.View`
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;
const TabbarStyled = styled(TabBar)`
    background-color: transparent;
    padding-top: ${({ theme }) => theme.spacings.smallest};
`;

export {
    Container,
    CoverPictureContainer,
    DarkBackground,
    DescriptionContainer,
    EditPictogramContainer,
    TabbarContainer,
    TabbarStyled,
};
