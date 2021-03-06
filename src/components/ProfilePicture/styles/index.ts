import styled from 'styled-components/native';

type ContainerProps = {
    border: boolean;
    borderColor: keyof Style.Colors;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    size: Style.Variant.ProfilePicture;
};
type ImageStyleProps = {
    size: Style.Variant.ProfilePicture;
};
type InnerContainerProps = {
    border: boolean;
    containerBorder: boolean;
    size: Style.Variant.ProfilePicture;
};

const PROFILE_PICTURE_SIZE = {
    huge: 170,
    large: 50,
    largest: 65,
    normal: 34,
    small: 30,
};
const INNER_CONTAINER_BORDER_WIDTH = {
    huge: 7,
    largest: 4,
    large: 3,
    normal: 2,
    small: 2,
};
const CONTAINER_BORDER_WIDTH = {
    huge: 7,
    largest: 4,
    large: 3,
    normal: 3,
    small: 3,
};

const Container = styled.View<ContainerProps>`
    border-color: ${({ borderColor, theme }) => theme.colors[borderColor]};
    border-radius: ${({ border, size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] +
            (border ? CONTAINER_BORDER_WIDTH[size] * 2 : 0) / 2
        }px`};
    border-width: ${({ border, size }) =>
        border ? `${CONTAINER_BORDER_WIDTH[size]}px` : 0};
    height: ${({ border, size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] +
            (border ? CONTAINER_BORDER_WIDTH[size] * 2 : 0)
        }px`};
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    width: ${({ border, size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] +
            (border ? CONTAINER_BORDER_WIDTH[size] * 2 : 0)
        }px`};
`;
const ImageStyled = styled.Image<ImageStyleProps>`
    height: ${({ size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] - INNER_CONTAINER_BORDER_WIDTH[size] * 2
        }px`};
    transform: scale(1.18);
    width: ${({ size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] - INNER_CONTAINER_BORDER_WIDTH[size] * 2
        }px`};
`;
const InnerContainer = styled.View<InnerContainerProps>`
    align-items: center;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ size }) => `${PROFILE_PICTURE_SIZE[size] / 2}px`};
    border-width: ${({ border, size }) => {
        if (!border) return 0;
        return `${INNER_CONTAINER_BORDER_WIDTH[size]}px`;
    }};
    height: ${({ size }) => `${PROFILE_PICTURE_SIZE[size]}px`};
    overflow: hidden;
    justify-content: center;
    width: ${({ size }) => `${PROFILE_PICTURE_SIZE[size]}px`};
`;

export { Container, ImageStyled, InnerContainer };
