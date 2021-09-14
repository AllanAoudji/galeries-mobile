import styled from 'styled-components/native';

type ImageContainerProps = {
    size: number;
    picked: boolean;
};
type ImageStyledProps = {
    picked: boolean;
};

const INDEX_PICKER_CONTAINER_SIZE = 24;

const ImageContainer = styled.Pressable<ImageContainerProps>`
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-width: ${({ picked }) => (picked ? '2px' : 0)};
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;
const ImageStyled = styled.Image<ImageStyledProps>`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    bottom: 0;
    position: absolute;
    opacity: ${({ picked }) => (picked ? 0.6 : 1)};
    left: 0;
    right: 0;
    top: 0;
`;
const IndexPickerContainer = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${() => `${INDEX_PICKER_CONTAINER_SIZE / 2}px`};
    height: ${() => `${INDEX_PICKER_CONTAINER_SIZE}px`};
    justify-content: center;
    position: absolute;
    right: 15px;
    top: 15px;
    width: ${() => `${INDEX_PICKER_CONTAINER_SIZE}px`};
`;

export { ImageContainer, ImageStyled, IndexPickerContainer };