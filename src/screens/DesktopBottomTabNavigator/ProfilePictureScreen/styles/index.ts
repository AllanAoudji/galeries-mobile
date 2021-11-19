import styled from 'styled-components/native';

import convertPixelToNum from '#helpers/convertPixelToNum';

type ImageStyledProps = {
    height: number;
    width: number;
};
type InnerContainerProps = {
    width: number;
};

const BlurBackground = styled.Image`
    opacity: 0.7;
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const ImageStyled = styled.Image<ImageStyledProps>`
    border-radius: 16px;
    height: ${({ height, theme }) =>
        `${height - convertPixelToNum(theme.spacings.huge) * 2}px`};
    width: ${({ theme, width }) =>
        `${width - convertPixelToNum(theme.spacings.smallest) * 2}px`};
`;
const InnerContainer = styled.Pressable<InnerContainerProps>`
    align-items: center;
    flex: 1;
    justify-content: center;
    width: ${({ width }) => `${width}px`};
`;

export { BlurBackground, Container, ImageStyled, InnerContainer };
