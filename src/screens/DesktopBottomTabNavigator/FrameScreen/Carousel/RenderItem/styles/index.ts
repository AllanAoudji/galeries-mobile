import styled from 'styled-components/native';
import convertPixelToNum from '#helpers/convertPixelToNum';

type ContainerProps = {
    width: number;
};
type ImageStyledProps = {
    height: number;
    width: number;
};

const Container = styled.View<ContainerProps>`
    align-items: center;
    flex: 1;
    justify-content: center;
    width: ${({ width }) => `${width}px`};
`;
const ImageStyled = styled.Image<ImageStyledProps>`
    border-radius: 16px;
    height: ${({ height, theme }) =>
        `${height - convertPixelToNum(theme.spacings.small)}px`};
    width: ${({ theme, width }) =>
        `${width - convertPixelToNum(theme.spacings.small)}px`};
`;

export { Container, ImageStyled };
