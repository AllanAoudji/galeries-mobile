import styled from 'styled-components/native';

type ImageStyledProps = {
    size: number;
};

const ImageStyled = styled.Image<ImageStyledProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { ImageStyled };
