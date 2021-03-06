import styled from 'styled-components/native';

type ImageContainerProps = {
    picked: boolean;
    size: number;
};
type ImageStyledProps = {
    picked: boolean;
    size: number;
};

const INDEX_PICKER_CONTAINER_SIZE = 24;

const ImageContainer = styled.Pressable<ImageContainerProps>`
    align-items: center;
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-width: ${({ picked }) => (picked ? '2px' : 0)};
    height: ${({ size }) => `${size}px`};
    justify-content: center;
    overflow: hidden;
    width: ${({ size }) => `${size}px`};
`;
const ImageStyled = styled.Image<ImageStyledProps>`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    bottom: 0;
    height: ${({ size }) => `${size}px`};
    left: 0;
    opacity: ${({ picked }) => (picked ? 0.6 : 1)};
    position: absolute;
    right: 0;
    top: 0;
    width: ${({ size }) => `${size}px`};
`;
const IndexPickerContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${() => `${INDEX_PICKER_CONTAINER_SIZE / 2}px`};
    height: ${() => `${INDEX_PICKER_CONTAINER_SIZE}px`};
    position: absolute;
    right: 15px;
    top: 15px;
    width: ${() => `${INDEX_PICKER_CONTAINER_SIZE}px`};
`;

export { ImageContainer, ImageStyled, IndexPickerContainer };
