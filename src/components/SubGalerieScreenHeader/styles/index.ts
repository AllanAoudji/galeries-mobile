import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

type TitleContainerProps = {
    width: number;
};

const Container = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    margin-bottom: ${() =>
        `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE_TEXT_MARGIN}px`};
`;
const CoverPictureContainer = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    overflow: hidden;
`;
const LinearGradientStyle = styled(LinearGradient)`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;
const TitleContainer = styled.View<TitleContainerProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    bottom: ${() =>
        `-${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE_TEXT_MARGIN}px`};
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
    padding: ${({ theme }) => theme.spacings.small};
    position: absolute;
    width: ${({ theme, width }) =>
        `${width - convertPixelToNum(theme.spacings.normal) * 2}px`};
    z-index: 10;
`;

export {
    Container,
    CoverPictureContainer,
    LinearGradientStyle,
    TitleContainer,
};
