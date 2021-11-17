import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import convertPixelToNum from '#helpers/convertPixelToNum';

type ContainerProps = {
    containerOuterSize: number;
    imageSize: number;
};
type LoadingContainerProp = {
    imageSize: number;
};
type ImageContainerProps = {
    imageSize: number;
};
type PictogramContainerProps = {
    imageSize: number;
};
type StyleImageProps = {
    imageSize: number;
};
type ErrorContainerProps = {
    containerOuterSize: number;
    imageSize: number;
    errorHeight: number;
};

const ActivityIndicatorStyled = styled.ActivityIndicator`
    transform: scale(1.2);
`;
const LoadingContainer = styled.Pressable<LoadingContainerProp>`
    align-items: center;
    border-radius: ${({ imageSize }) => `${imageSize / 2}px`};
    height: ${({ imageSize }) => `${imageSize}px`};
    justify-content: center;
    width: ${({ imageSize }) => `${imageSize}px`};
    overflow: hidden;
`;
const ImageContainer = styled(Animated.View)<ImageContainerProps>`
    height: ${({ imageSize }) => `${imageSize}px`};
    width: ${({ imageSize }) => `${imageSize}px`};
`;
const PictogramContainer = styled.View<PictogramContainerProps>`
    align-items: center;
    justify-content: center;
    position: absolute;
    height: ${({ imageSize }) => `${imageSize}px`};
    width: ${({ imageSize }) => `${imageSize}px`};
`;
const StyledImage = styled.Image<StyleImageProps>`
    height: ${({ imageSize }) => `${imageSize}px`};
    width: ${({ imageSize }) => `${imageSize}px`};
`;
const Container = styled(Animated.View)<ContainerProps>`
    height: ${({ containerOuterSize, imageSize }) =>
        `${imageSize + containerOuterSize}px`};
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: ${({ containerOuterSize, theme }) =>
        `${
            convertPixelToNum(theme.spacings.normal) - containerOuterSize / 2
        }px`};
    border-radius: ${({ containerOuterSize, imageSize }) =>
        `${imageSize + containerOuterSize / 2}px`};
    padding: ${({ containerOuterSize }) =>
        `${containerOuterSize}px ${containerOuterSize / 2}px`};
    overflow: hidden;
`;
const ErrorContainer = styled.Pressable<ErrorContainerProps>`
    flex: 1;
    width: ${({ imageSize, containerOuterSize, errorHeight }) =>
        `${errorHeight - (imageSize + containerOuterSize / 2)}px`};
    position: absolute;
    right: 0;
    padding: ${({ theme }) => `0 ${theme.spacings.smallest} 0`};
`;

export {
    ActivityIndicatorStyled,
    ErrorContainer,
    Container,
    LoadingContainer,
    ImageContainer,
    PictogramContainer,
    StyledImage,
};
