import styled from 'styled-components/native';

type ContainerProps = {
    size: Style.Variant.ProfilePicture;
    border: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};
type InnerContainerProps = {
    containerBorder: boolean;
    size: Style.Variant.ProfilePicture;
    border: boolean;
};

const PROFILE_PICTURE_SIZE = {
    small: 30,
    normal: 34,
    large: 50,
};
const INNER_CONTAINER_BORDER_WIDTH = {
    small: 2,
    normal: 2,
    large: 3,
};
const CONTAINER_BORDER_WIDTH = 3;

const Container = styled.View<ContainerProps>`
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${({ border, size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] +
            (border ? CONTAINER_BORDER_WIDTH * 2 : 0) / 2
        }px`};
    border-width: ${({ border }) =>
        border ? `${CONTAINER_BORDER_WIDTH}px` : 0};
    height: ${({ border, size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] +
            (border ? CONTAINER_BORDER_WIDTH * 2 : 0)
        }px`};
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    width: ${({ border, size }) =>
        `${
            PROFILE_PICTURE_SIZE[size] +
            (border ? CONTAINER_BORDER_WIDTH * 2 : 0)
        }px`};
`;
const ImageStyled = styled.Image`
    height: 100%;
    width: 100%;
    transform: scale(1.18);
`;
const InnerContainer = styled.View<InnerContainerProps>`
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ size }) => `${PROFILE_PICTURE_SIZE[size] / 2}px`};
    border-width: ${({ border, size }) => {
        if (!border) return 0;
        return `${INNER_CONTAINER_BORDER_WIDTH[size]}px`;
    }};
    height: ${({ size }) => `${PROFILE_PICTURE_SIZE[size]}px`};
    overflow: hidden;
    width: ${({ size }) => `${PROFILE_PICTURE_SIZE[size]}px`};
`;

export { Container, ImageStyled, InnerContainer };
