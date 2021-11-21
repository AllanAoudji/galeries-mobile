import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import convertPixelToNum from '#helpers/convertPixelToNum';

type ActivityIndicatorContainerProps = {
    imageSize: number;
};
type ContainerProps = {
    containerOuterSize: number;
    imageSize: number;
};
type ErrorContainerProps = {
    containerOuterSize: number;
    imageSize: number;
    errorHeight: number;
};
type ImageContainerProps = {
    imageSize: number;
};
type LoadingContainerProp = {
    imageSize: number;
};
type StyleImageProps = {
    imageSize: number;
};

const ActivityIndicatorContainer = styled.View<ActivityIndicatorContainerProps>`
    align-items: center;
    justify-content: center;
    position: absolute;
    height: ${({ imageSize }) => `${imageSize}px`};
    width: ${({ imageSize }) => `${imageSize}px`};
`;
const ActivityIndicatorStyled = styled.ActivityIndicator`
    transform: scale(1.2);
`;
const Container = styled(Animated.View)<ContainerProps>`
    align-items: center;
    border-radius: ${({ containerOuterSize, imageSize }) =>
        `${imageSize + containerOuterSize / 2}px`};
    flex-direction: row;
    height: ${({ containerOuterSize, imageSize }) =>
        `${imageSize + containerOuterSize}px`};
    justify-content: space-between;
    left: ${({ containerOuterSize, theme }) =>
        `${
            convertPixelToNum(theme.spacings.normal) - containerOuterSize / 2
        }px`};
    overflow: hidden;
    padding: ${({ containerOuterSize }) =>
        `${containerOuterSize}px ${containerOuterSize / 2}px`};
    position: absolute;
`;
const ErrorContainer = styled.Pressable<ErrorContainerProps>`
    flex: 1;
    width: ${({ imageSize, containerOuterSize, errorHeight }) =>
        `${errorHeight - (imageSize + containerOuterSize / 2)}px`};
    position: absolute;
    right: 0;
    padding: ${({ theme }) => `0 ${theme.spacings.smallest} 0`};
`;
const ImageContainer = styled(Animated.View)<ImageContainerProps>`
    height: ${({ imageSize }) => `${imageSize}px`};
    width: ${({ imageSize }) => `${imageSize}px`};
`;
const LoadingContainer = styled.Pressable<LoadingContainerProp>`
    align-items: center;
    border-radius: ${({ imageSize }) => `${imageSize / 2}px`};
    height: ${({ imageSize }) => `${imageSize}px`};
    justify-content: center;
    overflow: hidden;
    width: ${({ imageSize }) => `${imageSize}px`};
`;
const StyledImage = styled.Image<StyleImageProps>`
    height: ${({ imageSize }) => `${imageSize}px`};
    width: ${({ imageSize }) => `${imageSize}px`};
`;

export {
    ActivityIndicatorContainer,
    ActivityIndicatorStyled,
    Container,
    ErrorContainer,
    ImageContainer,
    LoadingContainer,
    StyledImage,
};
