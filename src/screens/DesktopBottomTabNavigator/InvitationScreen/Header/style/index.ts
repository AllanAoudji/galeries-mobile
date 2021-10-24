import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

type TitleContainerProps = {
    width: number;
};

const Container = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
`;
const CoverPictureContainer = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    overflow: hidden;
`;
const TitleContainer = styled.View<TitleContainerProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    bottom: -50px;
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
    padding: ${({ theme }) => theme.spacings.small};
    position: absolute;
    width: ${({ theme, width }) =>
        `${width - convertPixelToNum(theme.spacings.normal) * 2}px`};
`;

export { Container, CoverPictureContainer, TitleContainer };
